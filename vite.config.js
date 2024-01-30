import { defineConfig } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'
import mkcert from 'vite-plugin-mkcert'

// vite.config.js
export default defineConfig({
    plugins: [
        mkcert(),
        // eslintPlugin({ cache: false })
    ],
    server: {
        host: 'localhost',
        cors: {
            origin: '*'
        },
        port: '3000'
    },
    build: {
        minify: true,
        manifest: false,
        rollupOptions: {
            input: './src/main.js',
            output: {
                format: 'umd',
                entryFileNames: 'main.js',
                esModule: false,
                compact: true,
                globals: {
                    jquery: '$',
                },
            },
            external: ['jquery'],
        },
    },
})
