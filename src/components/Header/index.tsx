import { Avatar, Button, Flex, Text } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { FormEvent } from "react";

export default function Header() {
  const { data: session, status } = useSession();

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    try {
      await signIn();
    } catch (error) {
      console.log({ error });
    }
  }

  if (status === "loading")
    return (
      <Flex w="100%" h="16" backgroundColor="gray.300">
        <Text>Carregando sessão</Text>
      </Flex>
    );

  if (status === "authenticated")
    return (
      <Flex w="100%" h="16" alignItems="center" justifyContent="space-between">
        <Flex>
          <Avatar
            name={session.user?.name!}
            src={session.user?.image!}
            bg="teal.500"
          />
          <Flex flexDir={"column"} ml="2" justifyContent="center">
            <Text fontWeight="bold" fontSize="xs">
              {session.user?.name}
            </Text>
            <Text fontSize="xs">{session.user?.email}</Text>
          </Flex>
        </Flex>
        <Button onClick={() => signOut()} colorScheme="blue">
          Logout
        </Button>
      </Flex>
    );
  return (
    <Flex w="100%" h="16" alignItems="center" justifyContent="space-between">
      <Avatar name={""} src={""} />
      <Text>Crie uma conta</Text>
      <Button onClick={handleLogin} colorScheme="blue">
        Login
      </Button>
    </Flex>
  );
}
