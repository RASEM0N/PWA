import { defineConfig } from 'vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(() => {
	return {
		build: {
			rollupOptions: {
				input: path.join(__dirname, 'sw/index.ts'),
				output: {
					dir: './public/scripts',
					entryFileNames: 'sw.js',
				},
			},
		},
	};
});
