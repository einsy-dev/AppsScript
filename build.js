import copy from 'esbuild-copy-files-plugin';
import { clean } from 'esbuild-plugin-clean';
import esbuild from 'esbuild';

esbuild.build({
	entryPoints: ['src/*'],
	outdir: 'dist',

	// plugins: [GasPlugin],
	keepNames: true,
	plugins: [
		clean({
			patterns: ['dist/*'],
		}),
		copy({
			source: ['./appsscript.json'],
			target: './dist',
			copyWithFolder: true
		})
	],

}).catch(() => process.exit(1));