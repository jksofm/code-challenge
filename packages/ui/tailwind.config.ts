import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config/tailwind.config";

const config: Pick<Config, "content" | "presets" | "prefix"> = {
  content: [`src/**/*.{js,ts,jsx,tsx}`],

  presets: [sharedConfig],
};

export default config;
