import { defineConfig } from 'vite';
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config
export default defineConfig({
	plugins: [
		vue(),
		{
			name: 'tailwind',
			async configResolved(config) {
				const tailwindcss = await import('@tailwindcss/vite');
				config.plugins.push(tailwindcss.default());
			}
		}
	],
});
