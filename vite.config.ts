import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ["src/**/*"],
      exclude: ["src/**/*.stories.tsx", "src/**/*.test.tsx"],
      beforeWriteFile: (filePath, content) => {
        const transformedContent = content
          .replace(/@\/components/g, "./components")
          .replace(/@\/hooks/g, "./hooks")
          .replace(/@\/types/g, "./types")
          .replace(/@\/themes/g, "./themes")
          .replace(/@\/utils/g, "./utils")
          .replace(/@\/styles/g, "./styles")
          .replace(/@\//g, "./");
        return { filePath, content: transformedContent };
      },
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@/components": resolve(__dirname, "./src/components"),
      "@/hooks": resolve(__dirname, "./src/hooks"),
      "@/types": resolve(__dirname, "./src/types"),
      "@/themes": resolve(__dirname, "./src/themes"),
      "@/utils": resolve(__dirname, "./src/utils"),
      "@/styles": resolve(__dirname, "./src/styles"),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "FluesterndeBergGeist",
      formats: ["es", "umd"],
      fileName: (format) => `fluesternde-berg-geist.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "framer-motion", "lucide-react"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "framer-motion": "FramerMotion",
          "lucide-react": "LucideReact",
        },
        assetFileNames: "style.[ext]",
      },
    },
    cssCodeSplit: false,
    copyPublicDir: false,
  },
});
