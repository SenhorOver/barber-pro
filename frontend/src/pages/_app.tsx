import type { AppProps } from "next/app";
import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";

const colors = {
  barber: {
    900: { value: "#12131b" },
    400: { value: "#1b1c29" },
    100: { value: "#c6c6c6" },
  },
  button: {
    cta: { value: "#fba931" },
    default: { value: "#fff" },
    gray: { value: "#dfdfdf" },
    danger: { value: "#ff4040" },
  },
  orange: {
    900: { value: "#fba931" },
  },
};

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider value={system}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
