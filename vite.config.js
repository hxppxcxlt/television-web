import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import solid from "vite-plugin-solid";
import htmlMinimize from "@sergeymakinen/vite-plugin-html-minimize";
import compression from "vite-plugin-compression";
import svgprep from "vite-plugin-svgprep";
import cssimport from "postcss-import";
import tailwind from "tailwindcss";
import nested from "postcss-nested";
import autoprefixer from "autoprefixer";

export default defineConfig({
  plugins: [
    viteSingleFile(),
    solid(),
    svgprep(),
    htmlMinimize(),
    compression({ algorithm: "gzip", ext: ".gz" }),
    compression({ algorithm: "brotliCompress", ext: ".br" }),
  ],

  root: "./site",

  build: {
    target: "esnext",
    assetsInlineLimit: 100000000,
    chunkSizeWarningLimit: 100000000,
    cssCodeSplit: false,
    polyfillDynamicImport: false,
    outDir: "../webroot",
    emptyOutDir: true,
    brotliSize: false,
    rollupOptions: {
      inlineDynamicImports: true,
      output: {
        manualChunks: () => "everything.js",
      },
    },
  },

  css: {
    postcss: {
      plugins: [cssimport, tailwind, nested, autoprefixer],
    },
  },
});
