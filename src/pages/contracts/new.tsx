import AppLogo from "@/components/AppLogo";
import Header from "@/components/Header";
import { Flex, Stack } from "@chakra-ui/react";

export default function NewContract() {
  return (
    <Stack>
      <Flex px="4" flexDir="column" w={["100%", 500]}>
        <Header />
        <Flex alignItems="center" justifyContent="space-between" my="4">
          <AppLogo size="md" />
        </Flex>
      </Flex>
    </Stack>
  );
}
