import {StorybookConfig} from "@storybook/react-vite";
import {mergeConfig} from "vite";


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
  },
  viteFinal: async (config, { configType }) => {
    return mergeConfig(config, {
      server:{
        fs: {
            strict: false,
        }
      }
    })
  }
};
export default config;
