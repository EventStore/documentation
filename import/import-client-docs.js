const fs = require('fs');
const fsExtra = require('fs-extra')
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

let deployCurrent = true;

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

async function tryCopy(pathElements, subFolderName, destinationPath) {
    const sourcePath = path.join(...[...pathElements, subFolderName]);

    if (!fs.existsSync(sourcePath)) {
        log.info(`${sourcePath} does not exist, skipping...`);
        return false;
    }
        
    log.info(`${subFolderName}  exist, copying...`);

    await fsExtra.copy(sourcePath, destinationPath);

    return true;
}

async function copyDocsAndSamples(clientRepo, repoLocation, docsLocation, id, tag, relativePath) {
    log.info(`checking out ${tag}...`);
    await clientRepo.checkout(tag);

    const pathElements = [repoLocation, ...(relativePath || ['docs'])];

    const samplesDestinationPath = path.join(docsLocation, id, 'samples');
    const docsDestinationPath = path.join(docsLocation, id);

    const wereDocsCopied = await tryCopy(pathElements, 'docs', docsDestinationPath);
    const wereSamplesCopied = await tryCopy(pathElements, 'samples', samplesDestinationPath);

    if (!wereDocsCopied && !wereSamplesCopied) {
        return;
    }
    
    await replaceCodePath(docsDestinationPath, samplesDestinationPath);

    return {path: path.join('generated', id), version: id.substr(1) + ' gRPC'};
}

async function main() {
    await safeRmdir('temp');
    fs.mkdirSync('temp');

    for (const repo of repos) {
        const repoPath = path.join('docs', repo.basePath);
        const docsLocation = path.join(repoPath, 'generated');
        const repoLocation = path.join('temp', repo.id);

        await safeRmdir(docsLocation);
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

        const tags = (await clientRepo.tag())
            .split('\n')
            .filter(i => i)

        if (deployCurrent) {
            definition[0].versions.push(await copyDocsAndSamples(clientRepo, repoLocation, docsLocation, tags.slice(-1)[0], repo.currentBranch, repo.relativePath));
        }

        for (let i = 0; i < tags.length - 1; i++) {
            const version = await copyDocsAndSamples(clientRepo, repoLocation, docsLocation, tags[i], tags[i + 1]);

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
