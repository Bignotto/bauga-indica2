import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Suwannaphum } from "next/font/google";
import { theme } from "../styles/theme";

const textFont = Suwannaphum({ subsets: ["latin"], weight: "400" });
const headingFont = Suwannaphum({ subsets: ["latin"], weight: "700" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-suwannaphum: ${textFont.style.fontFamily};
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
