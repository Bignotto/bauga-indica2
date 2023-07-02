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

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

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
    </Stack>
  );
}
