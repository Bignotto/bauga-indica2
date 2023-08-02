import AppLogo from "@/components/AppLogo";
import Header from "@/components/Header";
import { api } from "@/services/api";
import { Flex, Stack, Text } from "@chakra-ui/react";
import { Contract, Message, Service, User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/AuthContext";

export default function ContractMessages() {
  const router = useRouter();
  const { status, session } = useAuth();

  const { contractId } = router.query;

  const [contract, setContract] = useState<
    Contract & {
      userProvider: User;
      userContractor: User;
      messages: Message[];
      service: Service;
    }
  >();

  useEffect(() => {
    async function loadContract() {
      try {
        const response = await api.get(`/contracts/${contractId}`);
        setContract(response.data);
      } catch (error) {
        console.log({ error });
      }
    }
    if (status === "unauthenticated") router.push("/");
    if (contractId) loadContract();
  }, [contractId, router, status]);

  //NEXT: style this page
  return (
    <Stack alignItems={"center"}>
      <Flex p={"4"} flexDir={"column"} w={["100%", 500]}>
        <Header />
        <Flex alignItems="center" justifyContent="space-between" my="4">
          <AppLogo size="sm" />
        </Flex>
        <Text>This is contract page for contract number {contractId}</Text>
        {contract?.messages.map((m) => (
          <Flex bg="gray.200" key={m.id}>
            <Text>{m.text}</Text>
          </Flex>
        ))}
      </Flex>
    </Stack>
  );
}
