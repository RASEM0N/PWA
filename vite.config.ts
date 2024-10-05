import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
// @ts-ignore
export default defineConfig(() => {
	return {
		plugins: [react()],
		define: {
			__SW_PATH__: JSON.stringify('./service-worker.js'),
		},
		build: {
			rollupOptions: {
				input: {
					index: path.join(__dirname, 'index.html'),
				},
				output: [
					{
						entryFileNames: 'assets/index.js',
						assetFileNames: (chunkInfo) => {
							if (chunkInfo.name === 'index.css') {
								return 'assets/index.css';
							}

							return chunkInfo.name;
						},
					},
				],
			},
		},
	};
});
