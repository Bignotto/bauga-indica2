import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Roboto_Slab } from "next/font/google";
import { theme } from "../styles/theme";

const textFont = Roboto_Slab({ subsets: ["latin"], weight: "400" });
const headingFont = Roboto_Slab({ subsets: ["latin"], weight: "700" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-textFont: ${textFont.style.fontFamily};
            --font-headingFont: ${headingFont.style.fontFamily};
          }
        `}
      </style>
      <SessionProvider session={pageProps.session}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </SessionProvider>
    </>
  );
}
