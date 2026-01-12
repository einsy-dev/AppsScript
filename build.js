import esbuild from 'esbuild';
import copy from 'esbuild-copy-files-plugin';
import { clean } from 'esbuild-plugin-clean';
import * as fs from "fs";

esbuild.build({
	entryPoints: ['src/index.ts', 'src/functions/index.ts'],
	outdir: 'dist',
	format: 'cjs',
	bundle: true,
	treeShaking: false,
	legalComments: 'inline',
	plugins: [
		clean({
			patterns: ['dist/*'],
		}),
		copy({
			source: ['./appsscript.json'],
			target: './dist',
			copyWithFolder: true
		}),
	],


}).then(() => {
	const file = fs.readFileSync("./dist/functions/index.js", "utf-8")
	fs.writeFileSync("./dist/functions/index.js", file.replace("\n * @preserve", ""), "utf-8")
}).catch(() => process.exit(1));