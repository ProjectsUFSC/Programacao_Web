import path from 'path';
import fs from 'fs';
import vue from '@vitejs/plugin-vue';

const SRC_DIR = path.resolve(__dirname, './src');
const PUBLIC_DIR = path.resolve(__dirname, './public');
const BUILD_DIR = path.resolve(__dirname, './www');

export default async () => {
  return {
    plugins: [
      vue({ template: { compilerOptions: { isCustomElement: (tag) => tag.includes('swiper-') } } }),
    ],
    root: SRC_DIR,
    base: '',
    publicDir: PUBLIC_DIR,
    build: {
      outDir: BUILD_DIR,
      assetsInlineLimit: 0,
      emptyOutDir: true,
      rollupOptions: {
        treeshake: false,
      },
    },
    resolve: {
      alias: {
        '@': SRC_DIR,
      },
    },
    server: {
      headers: {
        'Service-Worker-Allowed': '/'
      },
      https: {
        key: fs.readFileSync(path.resolve(__dirname, 'localhost+2-key.pem')), // Adjust the path if needed
        cert: fs.readFileSync(path.resolve(__dirname, 'localhost+2.pem')),   // Adjust the path if needed
      },
      port: 5731, // Use your desired port for the frontend
    },
  };
};
