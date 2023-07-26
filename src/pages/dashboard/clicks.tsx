import { api } from "@/services/api";
import {
  Avatar,
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
import { MdBarChart } from "react-icons/md";
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
        <HStack bg="gray.200" px="1" py="1">
          <Flex w="16%" justifyContent={"flex-end"} px="1">
            <Text fontSize={"smaller"} fontWeight={"bold"}>
              Clicks
            </Text>
          </Flex>

          <HStack
            justifyContent={"space-between"}
            alignItems={"center"}
            w={"100%"}
          >
            <Text fontSize={"smaller"} fontWeight={"bold"}>
              Serviço
            </Text>
          </HStack>
        </HStack>
        {clicks.map((c) => (
          //TODO: create component
          <HStack key={c.id} bg="gray.200" px="2">
            <Flex w="16%" justifyContent={"center"} px="2">
              <Text>{c.clicks}</Text>
            </Flex>

            <HStack
              justifyContent={"space-between"}
              alignItems={"center"}
              w={"100%"}
            >
              <Text noOfLines={1}>{c.title}</Text>
              <MdBarChart />
            </HStack>
          </HStack>
        ))}
      </Stack>
    </Stack>
  );
}
