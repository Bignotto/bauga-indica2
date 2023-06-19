import { Button, Flex, Image, Text } from "@chakra-ui/react";
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
      <Flex w="100%" h="16" backgroundColor="blue.300" alignItems="center">
        <Image
          src={session.user?.image!}
          alt="User Avatar"
          boxSize="14"
          objectFit="cover"
          rounded="full"
        />
        <Text>{session.user?.name}</Text>
        <Button onClick={() => signOut()}>Logout</Button>
      </Flex>
    );
  return (
    <Flex w="100%" h="16" backgroundColor="red.300">
      <Text>Não logado</Text>
      <Button onClick={handleLogin}>Login</Button>
    </Flex>
  );
}
