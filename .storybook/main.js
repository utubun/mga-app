/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  //stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx)'],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    //"@storybook/preset-create-react-app",
    //"@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "@storybook/addon-mdx-gfm"
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["../public"],
};
export default config;
