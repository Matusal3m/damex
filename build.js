import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { cp, mkdir, readFile } from 'fs/promises';
import { stdin as input, stdout as output } from 'process';
import { createInterface } from 'readline/promises';

const rl = createInterface({ input, output });

const distPath = './dist';
const packageJsonPath = './package.json';
const readmePath = './README.md';

async function getPackageVersion() {
    const packageContent = await readFile(packageJsonPath, {
        encoding: 'utf8',
    });

    const regex = /"version"\s*:\s*"([^"]+)"/gm;
    const version = regex.exec(packageContent);

    return version[1];
}

async function confirmVersionLoop() {
    let answer = '';
    while (true) {
        answer = await rl.question(
            `\n --- Have you updated the package version(y,n)? \n --- Current version is ${await getPackageVersion()}: `,
        );

        answer.toLowerCase();

        if (answer == 'n') {
            console.log('Update the current version');
            process.exit(-1);
        }

        rl.close();
        break;
    }
}

(async () => {
    await confirmVersionLoop();

    if (existsSync(distPath)) {
        execSync(`rm -rf ${distPath}`);
    }

    await mkdir(distPath);

    await cp(packageJsonPath, `${distPath}/package.json`);
    await cp(readmePath, `${distPath}/README.md`);
})();
