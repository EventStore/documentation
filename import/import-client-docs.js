const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');
const simpleGit = require('simple-git');
const git = simpleGit();
const exec = require('child_process').exec;
const del = require('del');
const log = require('../docs/.vuepress/lib/log');

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
        await del(path);
    }
}

async function replaceCodePath(mdPath, samplesPath) {
    const originalSamplesPath = '<<<\\ @\\/samples';
    const newSamplesPath = '<<<\\ @\\/' + samplesPath.replace(/\//g, '\\/');

    log.info(`replacing sample code imports...`);

    const replaceCommand = process.platform === 'darwin'
        ? `find ./${mdPath} -name '*.md' -print0 | xargs -0 sed -i '' \'s/${originalSamplesPath}/${newSamplesPath}/g\'`
        : `find ./${mdPath} -name '*.md' -exec sed -i \'s/${originalSamplesPath}/${newSamplesPath}/g\' {} \\;`;

    await sh(replaceCommand);
}

async function tryCopy(pathElements, destinationPath) {
    const sourcePath = path.join(...pathElements);

    if (!fs.existsSync(sourcePath)) {
        log.info(`${sourcePath} does not exist, skipping...`);
        return false;
    }
        
    log.info(`${sourcePath}  exist, copying...`);

    await fsExtra.copy(sourcePath, destinationPath);

    return true;
}

async function replaceFileExtensions(samplesDir,  from, to) {
    // this is needed because of the VuePress issue: https://github.com/vuejs/vuepress/issues/1189
    const command = "cd " + samplesDir + "; find . -depth -name \"*." + from + "\" -exec sh -c 'mv \"$3\" \"${3%." + from + "}." + to + "\"' sh \"" + from + "\" \"" + to + "\" {} ';'";
    
    await sh(command);
}

async function copyDocsAndSamples(clientRepo, repoLocation, destinationPath, branch, repo) {
    log.info(`checking out ${branch.name}...`);
    await clientRepo.checkout(branch.name);
    
    const destinationPathWithId = path.join(destinationPath, branch.version);

    if (repo.docsRelativePath)
        await copyDocs(repoLocation, destinationPathWithId, repo.docsRelativePath);

    if (repo.samplesRelativePath)
        await copySamples(repoLocation, destinationPathWithId, repo.samplesRelativePath);

    if (repo.postprocess)
        await postprocess(destinationPathWithId, repo.postprocess)

    return {path: path.join('generated', branch.version), version: branch.version};
}

async function copyDocs(repoLocation, destinationPathWithId, relativePath) {
    const pathElements = [repoLocation, ...relativePath];

    const docsDestinationPath = path.join(destinationPathWithId, 'docs');

    await tryCopy(pathElements, docsDestinationPath);
}

async function copySamples(repoLocation, destinationPathWithId, relativePath) {
    const pathElements = [repoLocation, ...relativePath];

    const samplesDestinationPath = path.join(destinationPathWithId, 'samples');

    const wereSamplesCopied = await tryCopy(pathElements, samplesDestinationPath);

    if (!wereSamplesCopied) {
        return;
    }
    
    await replaceFileExtensions('docs', 'rs', 'rust');
    await replaceCodePath(destinationPathWithId, samplesDestinationPath);
}

async function postprocess(destinationPathWithId, postprocess) {
    log.info('postprocessing');
    for (const rawCommand of postprocess) {
        const command = rawCommand.replace(/<root>/g, destinationPathWithId);
        await sh(command);
    }
}


async function main() {
    await safeRmdir('temp');
    fs.mkdirSync('temp');

    for (const repo of repos) {
        const repoPath = path.join('docs', repo.basePath);
        const samplesLocation = path.join(repoPath, 'generated');
        const repoLocation = path.join('temp', repo.id);

        await safeRmdir(samplesLocation);
        await git.clone(repo.repo, repoLocation);

        const clientRepo = simpleGit(repoLocation);

        const definition = [
            {
                id: repo.id,
                basePath: repo.basePath,
                group: repo.group,
                versions: []
            }
        ];

        log.info(`processing repo ${repo.repo}...`);

        for (const branch of repo.branches) {
            const version = await copyDocsAndSamples(
                clientRepo,
                repoLocation,
                samplesLocation, 
                branch,
                repo,
            );

            if (version !== undefined) {
                definition[0].versions.push(version);
            }
        }

        const def = JSON.stringify(definition, null, 1);
        fs.writeFileSync(path.join(repoPath, 'generated-versions.json'), def);
    }

    await safeRmdir('temp');
    log.success('done importing client docs')
}

main().then();
