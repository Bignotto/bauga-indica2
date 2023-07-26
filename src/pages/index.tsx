import AppLogo from "@/components/AppLogo";
import Header from "@/components/Header";
import { api } from "@/services/api";
import { Button, Flex, Input, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { useAuth } from "../hooks/AuthContext";

export default function Home() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  const { session } = useAuth();

  async function handleSearch(event: FormEvent) {
    event.preventDefault();
    if (searchText.length === 0) return;

    await api.post("log", {
      event: "search",
      subject: searchText,
      data: "",
      userId: session?.userId ?? "guest",
      userProvider: "",
    });

    router.push(`/search/${searchText}`);
  }

  return (
    <Stack alignItems="center" h="full">
      <Flex alignItems="center" flexDir="column" w={["100%", 500]} px="4">
        <Header />
        <Flex mt="8">
          <AppLogo size="lg" />
        </Flex>

        <Flex alignItems="center" flexDir={["column", "row"]} m="4" w="100%">
          <Input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="qual serviço está procurando"
            backgroundColor="gray.100"
            borderColor="gray.900"
            mr={["0", "2"]}
          />
          <Button
            colorScheme="blue"
            type="submit"
            onClick={handleSearch}
            width={["100%", "20%"]}
            mt={["4", "0"]}
          >
            Procurar
          </Button>
        </Flex>
      </Flex>
    </Stack>
  );
}
