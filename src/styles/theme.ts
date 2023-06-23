import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  fonts: {
    body: "var(--font-suwannaphum)",
    heading: "var(--font-headingFont)",
  },
  styles: {
    global: {
      body: {
        bg: "#CBD5E0",
      },
    },
  },
});
