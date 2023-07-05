import { Heading, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../../hooks/AuthContext";

export default function NewService() {
  const router = useRouter();
  const { status } = useAuth();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/");
  }, [router, status]);

  return (
    <Stack alignItems="center" h="full" mt="4">
      <Stack
        alignItems="center"
        justifyContent={"space-between"}
        w={["100%", 500]}
        px="4"
      >
        <Heading>Criar Serviço</Heading>
        <Text>and you are logged in!</Text>
      </Stack>
    </Stack>
  );
}
