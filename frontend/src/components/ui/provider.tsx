"use client";

import {
  ChakraProvider,
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react";

import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";

const colors = {
  barber: {
    900: { value: "#12131b" },
    400: { value: "#1b1c29" },
    100: { value: "#c6c6c6" },
  },
  button: {
    cta: { value: "#fba931" },
    DEFAULT: { value: "#fff" },
    gray: { value: "#dfdfdf" },
    danger: { value: "#ff4040" },
  },
  orange: {
    900: { value: "#fba931" },
  },
};

const config = defineConfig({
  theme: {
    tokens: {
      colors,
    },
  },
});

const system = createSystem(defaultConfig, config);

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} defaultTheme="dark" />
    </ChakraProvider>
  );
}
