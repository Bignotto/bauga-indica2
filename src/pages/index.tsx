import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  async function handleSearch(event: FormEvent) {
    event.preventDefault();
    if (searchText.length === 0) return;

    console.log("novo click -> ", searchText);
    router.push(`/search/${searchText}`);
  }

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    try {
      await signIn();
    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <Flex
      backgroundColor="gray.300"
      h="100vh"
      alignItems="center"
      justifyContent="center"
      flexDir="column"
    >
      <Flex w="100%" alignItems="center" flexDir="row" p="4">
        <Input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="qual serviço está procurando"
          backgroundColor="gray.100"
          borderColor="gray.900"
          mr="2"
        />
        <Button onClick={handleSearch}>Procurar</Button>
      </Flex>
      <Flex flexDir="column">
        {status === "authenticated" ? (
          <>
            <Text>LOGADO</Text>
            <Button onClick={() => signOut()}>Logout</Button>
          </>
        ) : (
          <>
            <Text>Não logado</Text>
            <Button onClick={handleLogin}>Login</Button>
          </>
        )}
      </Flex>
    </Flex>
  );
}
