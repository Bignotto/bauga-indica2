import { Flex, Heading } from "@chakra-ui/react";
import { Suwannaphum } from "next/font/google";

const textFont = Suwannaphum({ subsets: ["latin"], weight: "400" });
const buttonFont = Suwannaphum({ subsets: ["latin"], weight: "700" });

export default function Home() {
  return (
    <Flex backgroundColor="gray.800" h="100vh">
      <Flex>
        <Heading>This is Bauga Indica 2</Heading>
      </Flex>
    </Flex>
  );
}
