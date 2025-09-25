import type { AppProps } from "next/app";
import {
  ChakraProvider,
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react";
import { ColorModeProvider } from "@/components/ui/color-mode";

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

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider defaultTheme="dark">
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
  );
}
