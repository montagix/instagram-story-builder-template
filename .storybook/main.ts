import {StorybookConfig} from "@storybook/react-vite";
import {mergeConfig} from "vite";
import path from "path";

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  core: {
    crossOriginIsolated: true
  }
};
export default config;
