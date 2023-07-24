import { api } from "@/services/api";
import {
  Avatar,
  Box,
  Flex,
  HStack,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/AuthContext";

type ClickProps = {
  id: string;
  title: string;
  clicks: number;
};

export default function Clicks() {
  const [clicks, setClicks] = useState<ClickProps[]>([]);
  const { status, session } = useAuth();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadClicks() {
      try {
        const response = await api.get("users/clicks");
        setClicks(response.data);
      } catch (error) {
        console.log({ error });
      } finally {
        setIsLoading(false);
      }
    }
    loadClicks();
  }, []);

  //NEXT: show results to user
  return (
    <Stack alignItems="center" h="full" mt="4">
      <HStack
        alignItems="center"
        justifyContent={"space-between"}
        w={["100%", 500]}
        px="4"
      >
        <Flex>
          <Link as={NextLink} href="/users/profile">
            <Avatar name={session?.name} src={session?.image} bg="teal.500" />
          </Link>
          <Stack ml="2" justifyContent={"center"}>
            <Text mb="-1.5" fontSize={"xs"}>
              {session?.name}
            </Text>
            <Text mt="-1.5" fontSize={"xs"}>
              {session?.email}
            </Text>
          </Stack>
        </Flex>
        {/* <Button
          colorScheme="blue"
          size={"sm"}
          leftIcon={<MdAdd size={25} />}
          onClick={() => router.push("/services/new")}
        >
          Criar anúncio
        </Button> */}
      </HStack>
      <Flex
        alignItems="center"
        justifyContent={"space-between"}
        w={["100%", 500]}
        px="4"
        mt="4"
      >
        <Heading>Clicks por serviço</Heading>
      </Flex>
      <Stack w={["100%", 500]} px={"4"}>
        {clicks.map((c) => (
          <Box key={c.id} bg="gray.200">
            <Text>{c.title}</Text>
            <Text>{c.clicks}</Text>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
}
