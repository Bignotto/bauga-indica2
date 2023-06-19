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
      backgroundColor="gray.300"
      alignItems="center"
      flexDir="column"
      maxW={500}
    >
      <Header />
      <Flex w="100%" alignItems="center" flexDir="row" p="4" mt="16">
        <Input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="qual serviço está procurando"
          backgroundColor="gray.100"
          borderColor="gray.900"
          mr="2"
        />
        <Button onClick={handleSearch} colorScheme="blue">
          Procurar
        </Button>
      </Flex>
    </Flex>
  );
}
