const fs        = require("fs");
const path      = require("path");
const exec      = require("child_process").exec;
const del       = require("del");
const degit     = require("degit");

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

async function replaceCodePath(mdPath, samplesPath) {
    const originalSamplesPath = '<<<\\ @\\/samples';
    const newSamplesPath      = '<<<\\ @\\/' + samplesPath.replace(/\//g, '\\/');

    console.info(`Replacing sample code imports...`);

    const replaceCommand = process.platform === 'darwin'
        ? `find ./${mdPath} -name '*.md' -print0 | xargs -0 sed -i '' \'s/${originalSamplesPath}/${newSamplesPath}/g\'`
        : `find ./${mdPath} -name '*.md' -exec sed -i \'s/${originalSamplesPath}/${newSamplesPath}/g\' {} \\;`;

    await sh(replaceCommand);
}
async function copyDocsAndSamples(clientRepo, destinationPath, branch, repo) {
    const destinationPathWithId = path.join(destinationPath, branch.version);

    let result = null;
    if (repo.docsRelativePath) {
        await copyDocs(clientRepo, destinationPathWithId, branch.name, repo.docsRelativePath);
        result = {path: branch.version, version: branch.version};
    }

    if (repo.samplesRelativePath)
        await copySamples(clientRepo, destinationPathWithId, branch.name, repo.samplesRelativePath);

    if (repo.postprocess)
        await postprocess(destinationPathWithId, repo.postprocess)

    return result;
}

async function copyRepoFiles(repo, baseDest, branch, relativePath, subDest) {
    const destinationPath = path.join(baseDest, subDest || "");
    await safeRmdir(destinationPath);

    const sub      = relativePath.join("/");
    const repoPath = `${repo}/${sub}#${branch}`;

    console.info(`Fetching ${sub} from ${repo} branch ${branch} to ${destinationPath}`);
    await degit(repoPath).clone(destinationPath);
    fs.writeFileSync(path.join(destinationPath, ".gitignore"), "*");

    return {
        success:     true,
        destination: destinationPath
    };
}

async function copyDocs(clientRepo, destinationPathWithId, branch, relativePath) {
    return await copyRepoFiles(clientRepo, destinationPathWithId, branch, relativePath);
}

async function copySamples(clientRepo, destinationPathWithId, branch, relativePath) {
    const result = await copyRepoFiles(clientRepo, destinationPathWithId, branch, relativePath, "samples");

    if (!result.success) {
        return;
    }

    await replaceCodePath(destinationPathWithId, result.destination);
}

async function postprocess(destinationPathWithId, postprocess) {
    console.info(`Post-processing code in ${destinationPathWithId}`);
    for (const rawCommand of postprocess) {
        const command = rawCommand.replace(/<root>/g, destinationPathWithId);
        await sh(command);
    }
}

async function processRepo(repo) {
    const repoPath = path.join("docs", repo.basePath);

    const definition = [
        {
            id:       repo.id,
            basePath: repo.basePath,
            group:    repo.group,
            versions: []
        }
    ];

    console.info(`Processing ${repo.repo}...`);

    for (const branch of repo.branches) {
        const version = await copyDocsAndSamples(
            repo.repo,
            repoPath,
            branch,
            repo,
        );

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
