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

async function copyDocsAndSamples(clientRepo, repoLocation, destinationPath, id, tagOrBranch, samplesRelativePath, docsRelativePath) {
    log.info(`checking out ${tagOrBranch}...`);
    await clientRepo.checkout(tagOrBranch);
    
    const destinationPathWithId = path.join(destinationPath, id);

    if (docsRelativePath)
        await copyDocs(repoLocation, destinationPathWithId, docsRelativePath);

    if (samplesRelativePath)
        await copySamples(repoLocation, destinationPathWithId, samplesRelativePath);

    return {path: path.join('generated', id), version: id};
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

        const tags = (await clientRepo.tag())
            .split('\n')
            .filter(i => i)

        if (repo.deployCurrent) {
            definition[0].versions.push(await copyDocsAndSamples(clientRepo, repoLocation, samplesLocation, repo.version || tags.slice(-1)[0], repo.currentBranch, repo.samplesRelativePath, repo.docsRelativePath));
        }
        else {
            for (let i = 0; i < tags.length - 1; i++) {
                const version = await copyDocsAndSamples(clientRepo, repoLocation, samplesLocation, tags[i], tags[i + 1], repo.samplesRelativePath, repo.docsRelativePath);

                if (version !== undefined) {
                    definition[0].versions.push(version);
                }
            }
        }

        const def = JSON.stringify(definition, null, 1);
        fs.writeFileSync(path.join(repoPath, 'generated-versions.json'), def);
    }

    await safeRmdir('temp');
    log.success('done importing client docs')
}

main().then();
