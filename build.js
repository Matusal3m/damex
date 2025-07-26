import { execSync } from 'child_process';
import * as esbuild from 'esbuild';
import { existsSync } from 'fs';
import { cp, mkdir } from 'fs/promises';

const distPath = './dist';
const packageJsonPath = './package.json';
const readmePath = './README.md';
const entryPoint = './src/index.ts';

async function resetDist() {
    if (existsSync(distPath)) {
        execSync(`rm -rf ${distPath}`);
    }

    await mkdir(distPath);
}

async function copySubsidiariesToDist() {
    await cp(packageJsonPath, `${distPath}/package.json`);
    await cp(readmePath, `${distPath}/README.md`);
}

(async () => {
    await resetDist();

    await esbuild.build({
        platform: 'node',
        bundle: true,
        entryPoints: [entryPoint],
        minify: true,
        outfile: './dist/index.js',
    });

    await copySubsidiariesToDist();
})();
