import {
  Avatar,
  AvatarBadge,
  Button,
  Flex,
  HStack,
  Link,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { SignIn } from "@clerk/nextjs";
import NextLink from "next/link";
import { FormEvent } from "react";
import { LuHardHat } from "react-icons/lu";
import { MdEdit, MdOutlineDashboard } from "react-icons/md";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useAuth } from "../../hooks/AuthContext";

export default function Header() {
  // const { data: session, status } = useSession();
  const { session, appSignIn, appSignOut, status, supabaseSignIn } = useAuth();

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    try {
      await appSignIn();
    } catch (error) {
      console.log({ error });
    }
  }

  async function handleLoginSupabase(event: FormEvent) {
    event.preventDefault();

    try {
      await supabaseSignIn();
    } catch (error) {}
  }

  if (status === "loading")
    return (
      <Flex w="100%" h="16" backgroundColor="gray.300">
        <Spinner colorScheme="teal" size={"md"} />
      </Flex>
    );

  if (status === "authenticated") {
    return (
      <Flex w="100%" h="16" alignItems="center" justifyContent="space-between">
        <Flex>
          <Link as={NextLink} href="/users/profile">
            <Avatar name={session?.name!} src={session?.image!} bg="teal.500">
              {session?.phoneVerified ? (
                <AvatarBadge bg={"teal.500"} boxSize={"4"} borderWidth={"thin"}>
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
              {session?.name}
            </Text>
            <Text fontSize="xs">{session?.email}</Text>
          </Flex>
        </Flex>
        <HStack>
          <Link as={NextLink} href="/dashboard" _hover={{ bg: "#e6e6e6" }}>
            <MdOutlineDashboard size={24} />
          </Link>
          <Link as={NextLink} href="/providers" _hover={{ bg: "#e6e6e6" }}>
            <LuHardHat size={24} />
          </Link>
          <Button onClick={() => appSignOut()} variant={"ghost"}>
            <RiLogoutBoxRLine size={24} color="#2C5282" />
          </Button>
        </HStack>
      </Flex>
    );
  }
  return (
    <SignIn />
    // <Flex w="100%" h="16" alignItems="center" justifyContent="space-between">
    //   <Avatar name={""} src={""} />
    //   <Text>Entre com sua conta do Google</Text>
    //   <Button onClick={handleLogin} colorScheme="blue">
    //     Login
    //   </Button>
    //   <Button onClick={handleLoginSupabase} colorScheme="blue">
    //     Supabase
    //   </Button>
    // </Flex>
  );
}
