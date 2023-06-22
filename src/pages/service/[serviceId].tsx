import AppLogo from "@/components/AppLogo";
import Header from "@/components/Header";
import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ServiceDetails() {
  const router = useRouter();
  const { serviceId } = router.query;

  const [isLoading, setIsLoading] = useState(true);

  return (
    <Flex px="4" h="100%" flexDir="column" w={["100%", 500]}>
      <Header />
      <AppLogo size="md" />
    </Flex>
  );
}
