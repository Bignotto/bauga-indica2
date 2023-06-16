import { Flex, Heading, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <Flex
      backgroundColor="gray.800"
      h="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Flex w="100%" alignItems="center" flexDir="column">
        <Heading color="gray.200">This is Bauga Indica 2</Heading>
        <Text color="gray.300">Yeah! Version 2!</Text>
      </Flex>
    </Flex>
  );
}
