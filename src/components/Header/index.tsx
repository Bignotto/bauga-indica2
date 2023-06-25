import { api } from "@/services/api";
import {
  Avatar,
  AvatarBadge,
  Button,
  Flex,
  HStack,
  Link,
  Text,
} from "@chakra-ui/react";
import { User } from "@prisma/client";
import { signIn, signOut, useSession } from "next-auth/react";
import NextLink from "next/link";
import { FormEvent, useEffect, useState } from "react";
import {
  MdEdit,
  MdMessage,
  MdOutlineDashboard,
  MdOutlinePhonelinkErase,
} from "react-icons/md";
import { RiLogoutBoxRLine } from "react-icons/ri";

export default function Header() {
  const { data: session, status } = useSession();
  const [userProfile, setUserProfile] = useState<User>();

  //TODO: encapsulate this in a hook
  useEffect(() => {
    async function loadUserProfile() {
      const response = await api.get(`users/${session?.user?.email}`);
      setUserProfile(response.data);
      console.log("loaded user again");
    }

    if (status === "authenticated") {
      loadUserProfile();
    }
  }, [status]);

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

  if (status === "authenticated") {
    return (
      <Flex w="100%" h="16" alignItems="center" justifyContent="space-between">
        <Flex>
          <Link as={NextLink} href="/users/profile">
            <Avatar
              name={session.user?.name!}
              src={session.user?.image!}
              bg="teal.500"
            >
              {userProfile?.phoneConfirmed ? (
                <AvatarBadge bg={"blue.500"} boxSize={"4"} borderWidth={"thin"}>
                  <MdEdit size={12} />
                </AvatarBadge>
              ) : (
                <AvatarBadge bg={"red.500"} boxSize={"4"} borderWidth={"thin"}>
                  <MdEdit size={12} />
                </AvatarBadge>
              )}
            </Avatar>
          </Link>
          <Flex flexDir={"column"} ml="2" justifyContent="center">
            <Text fontWeight="bold" fontSize="xs">
              {session.user?.name}
            </Text>
            <Text fontSize="xs">{session.user?.email}</Text>
          </Flex>
        </Flex>
        <HStack>
          <MdOutlineDashboard size={24} />
          <MdMessage size={24} />
          <Button variant={"ghost"}>
            <MdOutlinePhonelinkErase size={24} />
          </Button>
          <Button onClick={() => signOut()} variant={"ghost"}>
            <RiLogoutBoxRLine size={24} color="#2C5282" />
          </Button>
        </HStack>
      </Flex>
    );
  }
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

// MdOutlinePhonelinkErase -> phone not confirmed
// MdOutlineSmartphone => phone confirmed
// PiSignOutFill -signout
