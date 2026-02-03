import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig(({ command, mode }) => {
  const isDev = command === 'serve';
  const buildStandalone = process.env.BUILD_STANDALONE === 'true';
  
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
    // Build standalone app (landing page) or widget
    ...(isDev ? {} : buildStandalone ? {
      build: {
        outDir: 'dist-standalone',
        rollupOptions: {
          input: resolve(__dirname, 'index.html'),
        },
        // For GitHub Pages - ensure assets are relative
        assetsDir: 'assets',
        base: './',
      },
    } : {
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
        // For GitHub Pages - ensure assets are relative
        assetsDir: '',
      },
    }),
    css: {
      postcss: './postcss.config.js',
    },
  };
});

