import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(() => {
	return {
		plugins: [react()],
		define: {
			__SW_PATH__: JSON.stringify('./scripts/sw.js'),
		},
	};
});
