import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(() => {
	return {
		plugins: [
			react()
		],
		resolve: {
			alias: {
				__SW_PATH__: './scripts/sw.js'
			}
		}
	};
});
