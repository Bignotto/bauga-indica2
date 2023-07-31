import AppLogo from "@/components/AppLogo";
import Header from "@/components/Header";
import { Flex, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function NewContract() {
  const router = useRouter();
  const { serviceId } = router.query;

  //NEXT: load service and create send message form

  return (
    <Stack alignItems={"center"}>
      <Flex px="4" flexDir="column" w={["100%", 500]}>
        <Header />
        <Flex alignItems="center" justifyContent="space-between" my="4">
          <AppLogo size="md" />
        </Flex>
        <Text>New contract for {serviceId}</Text>
      </Flex>
    </Stack>
  );
}
