import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig(({ command, mode }) => {
  const isDev = command === 'serve';
  
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    // Define global variables to replace process.env references
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode === 'production' ? 'production' : 'development'),
      'process.env': '{}',
    },
    // Only use lib mode for production builds
    ...(isDev ? {} : {
      build: {
        lib: {
          entry: resolve(__dirname, 'src/main.ts'),
          name: 'ZakatWidget',
          fileName: (format) => `zakat-widget.${format === 'iife' ? 'js' : format}`,
          formats: ['iife'],
        },
        rollupOptions: {
          output: {
            extend: true,
            entryFileNames: 'zakat-widget.js',
            assetFileNames: (assetInfo) => {
              if (assetInfo.name && assetInfo.name.endsWith('.css')) {
                return 'zakat-widget.css';
              }
              return assetInfo.name || 'asset';
            },
          },
        },
        cssCodeSplit: false,
        outDir: 'dist',
      },
    }),
    css: {
      postcss: './postcss.config.js',
    },
  };
});

