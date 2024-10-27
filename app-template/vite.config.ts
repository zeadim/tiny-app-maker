import { defineConfig } from "vite"
import { viteSingleFile } from "vite-plugin-singlefile"

export default defineConfig({
    build: {
        outDir: '../src/assets',
        emptyOutDir: true,
    },
    server: {
        host: '0.0.0.0',
    },
    plugins: [viteSingleFile()],
});
