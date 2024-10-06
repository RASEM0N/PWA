import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { injectVarsInHTML } from './plugins/injectVarsInHTML';

// https://vitejs.dev/config/
// @ts-ignore
export default defineConfig(({ mode }) => {
	const IS_DEV = mode === 'development';

	return {
		plugins: [
			react(),
			injectVarsInHTML({
				name: 'PWA',
				title: 'Тестовый проект PWA',
				description:
					'Тестовый проект с использованием React, ServiceWorker, CacheStorage, IndexDB, MessageChannel',
			}),
		],
		define: {
			__SW_PATH__: JSON.stringify('./service-worker.js'),
			__IS_DEV__: JSON.stringify(IS_DEV),
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
