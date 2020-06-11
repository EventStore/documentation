const fs = require('fs');
const fsExtra = require('fs-extra')
const path = require('path');
const simpleGit = require('simple-git');
const git = simpleGit();

let deployCurrent = true;

let repos = [
    {
        id: "dotnet-client",
        basePath: "clients/dotnet",
        currentBranch: 'mat-mcloughlin/doc-init',
        repo: 'https://github.com/EventStore/EventStore-Client-Dotnet.git',
    }
]

async function copy(clientRepo, repoLocation, docsLocation, id, tag) {
    console.log(`checking out ${tag}`);
    await clientRepo.checkout(tag)

    if (fs.existsSync(path.join(repoLocation, 'docs', 'docs'))) {
        console.log('docs exist, copying');

        await fsExtra.copy(path.join(repoLocation, 'docs', 'docs'), path.join(docsLocation, id));
        await fsExtra.copy(path.join(repoLocation, 'docs', 'samples'), path.join(docsLocation, id, 'samples'));
        return {path: path.join('generated', id), version: id};
    }
}

async function main() {
    fs.rmdirSync('temp', {recursive: true});
    fs.mkdirSync('temp');

    for (const repo of repos) {
        let docsLocation = path.join('docs', repo.basePath, 'generated');
        let repoLocation = path.join('temp', repo.id);

        fs.rmdirSync(docsLocation, {recursive: true});
        await git.clone(repo.repo, repoLocation);

        let clientRepo = simpleGit(repoLocation);

        let definition = [
            {
                id: repo.id,
                basePath: repo.basePath,
                versions: []
            }
        ]

        console.log(repo);
        if (deployCurrent) {
            definition[0].versions.push(await copy(clientRepo, repoLocation, docsLocation, 'current', repo.currentBranch));
        }

        let tags = (await clientRepo.tag())
            .split('\n')
            .filter(i => i)

        for (const tag of tags) {
            let version = await copy(clientRepo, repoLocation, docsLocation, tag, tag);

            if (version != null) {
                definition[0].versions.push(version);
            }
        }

        console.log(definition);
        fs.writeFileSync(path.join('docs', repo.basePath) + '/generated-versions.json', JSON.stringify(definition))
    }

    fs.rmdirSync('temp', {recursive: true});
}

main().then();