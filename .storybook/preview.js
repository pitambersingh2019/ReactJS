import '../src/index.css'
import React from "react";
import { ThemeProvider } from "styled-components";
import { customTheme } from "../src/styles/theme";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={customTheme}>
      <Story />
    </ThemeProvider>
  ),
];
