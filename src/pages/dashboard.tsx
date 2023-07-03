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

import { useRouter } from "next/router";
import { useEffect } from "react";
import { GiToolbox } from "react-icons/gi";
import { LuMousePointerClick } from "react-icons/lu";
import { MdMessage, MdOutlineArrowRightAlt } from "react-icons/md";
import { useAuth } from "../hooks/AuthContext";

export default function Dashboard() {
  const router = useRouter();
  const { status } = useAuth();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/");
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
            <Avatar name={"Big"} src={""} bg="teal.500" />
          </Link>
          <Stack ml="2" justifyContent={"center"}>
            <Text mb="-1.5" fontSize={"sm"}>
              Thiago Bignotto
            </Text>
            <Text mt="-1.5" fontSize={"sm"}>
              bignotto@email.com
            </Text>
          </Stack>
        </Flex>
        <Button colorScheme="blue" size={"sm"}>
          Criar anúncio
        </Button>
      </HStack>

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
              ml={"4"}
            >
              <Text fontSize={"x-large"} fontWeight={"bold"} mb={"-1.5"}>
                4
              </Text>
              <Text>anúncios</Text>
            </Flex>
          </HStack>
          <HStack>
            <Link as={NextLink} href="" fontSize={"sm"} fontWeight={"bold"}>
              Meus anúncios
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
              ml={"4"}
            >
              <Text fontSize={"x-large"} fontWeight={"bold"} mb={"-1.5"}>
                8
              </Text>
              <Text>mensagens</Text>
            </Flex>
          </HStack>
          <HStack>
            <Link as={NextLink} href="" fontSize={"sm"} fontWeight={"bold"}>
              Minhas mensagens
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
          <HStack>
            <LuMousePointerClick size={38} />
            <Flex
              flexDir={"column"}
              justifyContent={"center"}
              alignItems={"flex-start"}
              px={"4"}
              ml={"4"}
            >
              <Text fontSize={"x-large"} fontWeight={"bold"} mb={"-1.5"}>
                24
              </Text>
              <Text>clicks</Text>
            </Flex>
          </HStack>
          <HStack>
            <Link as={NextLink} href="" fontSize={"sm"} fontWeight={"bold"}>
              Minhas visualizações
            </Link>
            <MdOutlineArrowRightAlt size={30} />
          </HStack>
        </HStack>
      </Stack>
    </Stack>
  );
}
