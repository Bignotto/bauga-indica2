import AppLogo from "@/components/AppLogo";
import Header from "@/components/Header";
import { api } from "@/services/api";
import { Flex, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ServiceDetails() {
  const router = useRouter();
  const { serviceId } = router.query;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadService() {
      const response = await api.get(`/services/${serviceId}`);
      console.log(response.data);
      setIsLoading(false);
    }

    loadService();
  }, []);

  return (
    <Stack alignItems={"center"}>
      <Flex h="full" px="4" flexDir="column" w={["100%", 500]}>
        <Header />
        <AppLogo size="md" />
      </Flex>
    </Stack>
  );
}
