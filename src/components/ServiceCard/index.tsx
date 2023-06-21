import { Flex, Heading, Text } from "@chakra-ui/react";

export default function ServiceCard() {
  return (
    <Flex w="100%" bg="gray.100">
      <Heading>Service Name</Heading>
      <Text>
        Service long description. This description should take more than tree
        lines so we can design this component with better accuracy.
      </Text>
    </Flex>
  );
}
