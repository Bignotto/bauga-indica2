import AppLogo from "@/components/AppLogo";
import Header from "@/components/Header";
import { Flex, Heading, Stack } from "@chakra-ui/react";

export default function Contracts() {
  return (
    <Stack alignItems={"center"}>
      <Flex p={"4"} flexDir={"column"} w={["100%", 500]}>
        <Header />
        <Flex alignItems="center" justifyContent="space-between" my="4">
          <AppLogo size="sm" />
        </Flex>
      </Flex>
      <Heading>This is the contracts list page</Heading>
    </Stack>
  );
}
