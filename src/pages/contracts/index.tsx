import AppLogo from "@/components/AppLogo";
import ContractCard from "@/components/ContractCard";
import Header from "@/components/Header";
import { api } from "@/services/api";
import { Flex, Heading, Spinner, Stack } from "@chakra-ui/react";
import { Contract, Message, Review, Service, User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/AuthContext";

export default function Contracts() {
  const router = useRouter();
  const { status, session, sessionLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  const [contracts, setContracts] = useState<
    (Contract & {
      service: Service;
      userContractor: User;
      messages: Message[];
      reviews: Review[];
    })[]
  >();

  useEffect(() => {
    async function loadContracts() {
      if (sessionLoading) return;
      try {
        const response = await api.get(`users/contracts/${session?.userId}`);
        setContracts(response.data);
      } catch (error) {
        console.log({ error });
      } finally {
        setIsLoading(false);
      }
    }
    if (status === "unauthenticated") router.push("/");
    if (status === "authenticated") loadContracts();
  }, [router, session?.userId, sessionLoading, status]);

  return (
    <Stack alignItems={"center"}>
      <Flex p={"4"} flexDir={"column"} w={["100%", 500]}>
        <Header />
        <Flex alignItems="center" justifyContent="space-between" my="4">
          <AppLogo size="sm" />
        </Flex>
        <Heading>Serviços prestados</Heading>
        {isLoading ? (
          <Spinner />
        ) : (
          contracts?.map((contract) => (
            <Flex key={contract.id} mt="2">
              <ContractCard contract={contract} mode="contractor" />
            </Flex>
          ))
        )}
      </Flex>
    </Stack>
  );
}
