import AppLogo from "@/components/AppLogo";
import Header from "@/components/Header";
import { api } from "@/services/api";
import { Flex, Heading, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/AuthContext";

export default function Contracts() {
  const router = useRouter();
  const { status, session } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardProps() {
      try {
        const response = await api.get("users/dashboard");
      } catch (error) {
        console.log({ error });
      } finally {
        setIsLoading(false);
      }
    }
    if (status === "unauthenticated") router.push("/");
    if (status === "authenticated") loadDashboardProps();
  }, [router, status]);

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
