import AppLogo from "@/components/AppLogo";
import Header from "@/components/Header";
import { Button, Flex, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  async function handleSearch(event: FormEvent) {
    event.preventDefault();
    if (searchText.length === 0) return;

    console.log("novo click -> ", searchText);
    router.push(`/search/${searchText}`);
  }

  return (
    <Flex
      height="100vh"
      alignItems="center"
      flexDir="column"
      minW={["100%", 500]}
    >
      <Header />
      <Flex mt="8">
        <AppLogo size="lg" />
      </Flex>

      <Flex alignItems="center" flexDir="row" p="4" mt="4" w="100%">
        <Input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="qual serviço está procurando"
          backgroundColor="gray.100"
          borderColor="gray.900"
          mr="2"
        />
        <Button colorScheme="blue" type="submit" onClick={handleSearch}>
          Procurar
        </Button>
      </Flex>
    </Flex>
  );
}
