import AppInput from "@/components/AppInput";
import AppLogo from "@/components/AppLogo";
import Header from "@/components/Header";
import { api } from "@/services/api";
import {
  Box,
  Flex,
  Heading,
  Skeleton,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Contract, Service, User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/AuthContext";

type AppContract = Contract & {
  userProvider: User;
  userContractor: User;
  service: Service;
};

export default function ContractMessages() {
  const router = useRouter();
  const { status, session } = useAuth();

  const { contractId } = router.query;

  const [contract, setContract] = useState<AppContract>();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadContract() {
      try {
        setIsLoading(true);
        const response = await api.get(`/contracts/${contractId}`);
        setContract(response.data);
      } catch (error) {
        console.log({ error });
      } finally {
        setIsLoading(false);
      }
    }
    if (status === "unauthenticated") router.push("/");
    if (contractId) loadContract();
  }, [contractId, router, status]);

  return (
    //NEXT: style review page
    <Stack alignItems={"center"}>
      <Flex p={"4"} flexDir={"column"} w={["100%", 500]}>
        <Header />
        <Flex alignItems="center" justifyContent="space-between" my="4">
          <AppLogo size="sm" />
        </Flex>
        <Heading>Avaliação</Heading>
        <Skeleton isLoaded={!isLoading}>
          <Box bg="blue.200">
            <Text>Avalie o serviço de {contract?.userProvider.name}.</Text>
            <Flex>
              <Text>{contract?.service.title}</Text>
              <Text>{contract?.service.description}</Text>
            </Flex>
          </Box>
        </Skeleton>
        <Flex bg="green.200" flexDir={"column"}>
          <AppInput error="" label="Diga o que achou do serviço:" />
          <AppInput
            as={Textarea}
            error=""
            label="Conte tudo sobre o serviço prestado:"
          />
        </Flex>
      </Flex>
    </Stack>
  );
}
