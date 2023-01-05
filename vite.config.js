import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import adaptiveModuleFederationPlugin from "./script/adaptiveModuleFederationPlugin";
import pkg from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "remote_app",
      filename: "remoteEntry.js",
      // Modules to expose
      exposes: {
        "./ModuleB": "./src/App.jsx",
      },
      shared: {
        ...Object.entries(pkg.dependencies).reduce((acc, [key, version]) => {
          acc[key] = {
            version: version,
          };
          return acc;
        }, {}),
      },
    }),
  ],
  server: {
    host: true,
    port: 4002,
  },
  preview: {
    port: 4002,
  },
  build: {
    minify: false,
    sourcemap: true,
    target: "esnext",
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
