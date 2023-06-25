import AppInput from "@/components/AppInput";
import AppLogo from "@/components/AppLogo";
import { api } from "@/services/api";
import { Avatar, Flex, Heading, Spinner, Stack, Text } from "@chakra-ui/react";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Profile() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [userProfile, setUserProfile] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  //TODO: encapsulate this in a hook
  useEffect(() => {
    async function loadUserProfile() {
      const response = await api.get(`users/${session?.user?.email}`);
      setUserProfile(response.data);
      console.log("loaded user again");
      setIsLoading(false);
    }

    if (status === "authenticated") loadUserProfile();
    if (status === "unauthenticated") router.push("/");
  }, [status]);

  return (
    <Stack alignItems={"center"}>
      <Flex
        alignItems="center"
        flexDir="column"
        w={["100%", 500]}
        px="4"
        mt="2"
      >
        <AppLogo />
        <Flex bg="gray.800" h={0.5} w="100%" my="4" />
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Avatar
              src={userProfile?.image!}
              name={userProfile?.name!}
              size={"2xl"}
            />
            <Text fontWeight={"bold"} fontSize={"lg"} mt="4">
              Perfil público de
            </Text>
            <Heading>{userProfile?.name}</Heading>
            <AppInput
              placeholder="Meu input"
              label="Nome completo"
              error={"Nome não pode estar em branco"}
            />
          </>
        )}
      </Flex>
    </Stack>
  );
}
