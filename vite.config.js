import { defineConfig } from 'vite';

export default defineConfig({
    root: 'src',
    server: {
        port: 3000,
        open: true,
    },
    build: {
        outDir: '../dist', // Указываем выходную директорию для сборки
        emptyOutDir: true, // Очищаем директорию перед сборкой
        lib: {
            entry: 'main.ts', // Путь к вашему файлу с компонентом
            name: 'ChatWidget',
            fileName: 'dataisland-widget',
            formats: ['es'], // ES-модуль для современных браузеров
        },
        rollupOptions: {
            external: /^lit/, // Исключите зависимости, такие как lit
            output: {
                globals: {
                    lit: 'lit',
                },
            },
        },
    },
});
