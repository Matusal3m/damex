import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { cp, mkdir } from 'fs/promises';

const distPath = './dist';
const packageJsonPath = './package.json';
const readmePath = './README.md';

(async () => {
    if (existsSync(distPath)) {
        execSync(`rm -rf ${distPath}`);
    }

    await mkdir(distPath);

    await cp(packageJsonPath, `${distPath}/package.json`);
    await cp(readmePath, `${distPath}/README.md`);
})();
