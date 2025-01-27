const fs = require("fs");
const path = require("path");
const exec = require("child_process").exec;
const del = require("del");
const degit = require("degit");

const repos = require('./repos.json');

async function sh(cmd) {
    return new Promise(function (resolve, reject) {
        exec(cmd, (err, stdout, stderr) => {
            if (err) {
                reject(err);
            } else {
                resolve({stdout, stderr});
            }
        });
    });
}

async function safeRmdir(path) {
    if (fs.existsSync(path)) {
        console.log("Removing", path);
        await del(path);
    }
}

async function copyDocsAndSamples(destinationPath, samplesPath, branch, repo) {
    const destination = path.join(destinationPath, branch.version);
    const samplesDest = path.join(samplesPath, repo.basePath, branch.version);

    let result = null;
    if (repo.docsRelativePath) {
        const repPath = [...repo.docsRelativePath];
        if (branch.relativePath) {
            repPath.push(...branch.relativePath);
        }
        await copyDocs(repo.repo, destination, branch.name, repPath);
        result = {
            path: branch.version,
            version: branch.version,
            startPage: branch.startPage,
            preview: branch.preview,
            deprecated: branch.deprecated,
            hide: branch.hide
        };
        if (repo.postprocess)
            await postprocess(destination, repo.postprocess)
    }

    if (repo.samplesRelativePath) {
        await copyDocs(repo.repo, samplesDest, branch.name, repo.samplesRelativePath);
        if (repo.samplesPostprocess)
            await postprocess(samplesDest, repo.samplesPostprocess)
    }

    return result;
}

async function copyRepoFiles(repo, baseDest, branch, relativePath, subDest) {
    const destinationPath = path.join(baseDest, subDest || "");
    await safeRmdir(destinationPath);

    const sub = relativePath.join("/");
    const repoPath = `${repo}/${sub}#${branch}`;

    console.info(`Fetching ${sub} from ${repo} branch ${branch} to ${destinationPath}`);
    await degit(repoPath).clone(destinationPath);
    fs.writeFileSync(path.join(destinationPath, ".gitignore"), "*");

    return {
        success: true,
        destination: destinationPath
    };
}

async function copyDocs(clientRepo, destination, branch, relativePath) {
    return await copyRepoFiles(clientRepo, destination, branch, relativePath);
}

async function postprocess(destination, postprocess) {
    console.info(`Post-processing code in ${destination}`);
    for (const rawCommand of postprocess) {
        const command = rawCommand.replace(/<root>/g, destination);
        await sh(command);
    }
}

async function processRepo(repo) {
    const repoPath = path.join("docs", repo.basePath);
    const samplesPath = path.join("docs", "samples");

    const definition = [
        {
            id: repo.id,
            basePath: repo.basePath,
            group: repo.group,
            versions: []
        }
    ];

    console.info(`Processing ${repo.repo}...`);

    for (const branch of repo.branches) {
        const version = await copyDocsAndSamples(repoPath, samplesPath, branch, repo);

        if (version !== null) {
            definition[0].versions.push(version);
        }
    }

    if (definition[0].versions.length > 0) {
        const def = JSON.stringify(definition, null, 1);
        fs.writeFileSync(path.join(repoPath, `generated-versions.json`), def);
    }
}

async function main() {
    for (const repo of repos) {
        await processRepo(repo);
    }
    console.info("Done!")
}

main().then();
