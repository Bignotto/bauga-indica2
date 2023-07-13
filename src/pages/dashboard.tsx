import {
  Avatar,
  Button,
  Flex,
  HStack,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";

import { api } from "@/services/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GiToolbox } from "react-icons/gi";
import { LuMousePointerClick } from "react-icons/lu";
import { MdAdd, MdMessage, MdOutlineArrowRightAlt } from "react-icons/md";
import { useAuth } from "../hooks/AuthContext";

export default function Dashboard() {
  const router = useRouter();
  const { status, session } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [adsCount, setAdsCount] = useState(0);
  const [messagesCount, setMessagesCount] = useState(0);
  const [clicksCount, setClicksCount] = useState(0);

  useEffect(() => {
    async function loadDashboardProps() {
      try {
        const response = await api.get("users/dashboard");
        setAdsCount(response.data.servicesCount);
        setMessagesCount(response.data.messagesCount);
        setClicksCount(response.data.visualizationsCount);
      } catch (error) {
        console.log({ error });
      } finally {
        setIsLoading(false);
      }
    }
    if (status === "unauthenticated") router.push("/");
    if (status === "authenticated") loadDashboardProps();
  }, [router, status]);

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
        <Button
          colorScheme="blue"
          size={"sm"}
          leftIcon={<MdAdd size={25} />}
          onClick={() => router.push("/services/new")}
        >
          Criar anúncio
        </Button>
      </HStack>

      <Flex flexDir="column" px="4">
        <Stack w={["100%", 500]} mt="4">
          <Text>Seus anúncios:</Text>
          <HStack
            bg="gray.200"
            p={"6"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <HStack>
              <GiToolbox size={38} />
              <Flex
                flexDir={"column"}
                justifyContent={"center"}
                alignItems={"flex-start"}
                px={"4"}
                ml={"2"}
              >
                <Text fontSize={"x-large"} fontWeight={"bold"} mb={"-1.5"}>
                  {adsCount}
                </Text>
                <Text>anúncios</Text>
              </Flex>
            </HStack>
            <HStack>
              <Link
                as={NextLink}
                href="/users/services"
                fontSize={"xs"}
                fontWeight={"bold"}
              >
                Ver anúncios
              </Link>
              <MdOutlineArrowRightAlt size={30} />
            </HStack>
          </HStack>
        </Stack>

        <Stack w={["100%", 500]} mt="4">
          <Text>Suas mensagens:</Text>
          <HStack
            bg="gray.200"
            p={"6"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <HStack>
              <MdMessage size={38} />
              <Flex
                flexDir={"column"}
                justifyContent={"center"}
                alignItems={"flex-start"}
                px={"4"}
                ml={"2"}
              >
                <Text fontSize={"x-large"} fontWeight={"bold"} mb={"-1.5"}>
                  {messagesCount}
                </Text>
                <Text>mensagens</Text>
              </Flex>
            </HStack>
            <HStack>
              <Link as={NextLink} href="" fontSize={"xs"} fontWeight={"bold"}>
                Ver mensagens
              </Link>
              <MdOutlineArrowRightAlt size={30} />
            </HStack>
          </HStack>
        </Stack>

        <Stack w={["100%", 500]} mt="4">
          <Text>Suas visualizações:</Text>
          <HStack
            bg="gray.200"
            p={"6"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <HStack justifyContent={"space-between"}>
              <LuMousePointerClick size={38} />
              <Flex
                flexDir={"column"}
                justifyContent={"center"}
                alignItems={"flex-start"}
                px={"4"}
                ml={"2"}
              >
                <Text fontSize={"x-large"} fontWeight={"bold"} mb={"-1.5"}>
                  {clicksCount}
                </Text>
                <Text>clicks</Text>
              </Flex>
            </HStack>
            <HStack>
              <Link as={NextLink} href="" fontSize={"xs"} fontWeight={"bold"}>
                Ver clicks
              </Link>
              <MdOutlineArrowRightAlt size={30} />
            </HStack>
          </HStack>
        </Stack>
      </Flex>
    </Stack>
  );
}
