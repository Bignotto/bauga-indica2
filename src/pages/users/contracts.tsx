import Header from "@/components/Header";
import { api } from "@/services/api";
import {
  Box,
  Flex,
  HStack,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Contract, Service, ServiceType, User } from "@prisma/client";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/AuthContext";

export default function Contracts() {
  const { session } = useAuth();

  const [filterSelected, setFilterSelected] = useState("active");
  const [servicesList, setServicesList] = useState<
    (Service & {
      provider: User;
      serviceType: ServiceType;
    })[]
  >();

  const [contractsList, setContractList] = useState<
    (Contract & {
      service: Service;
    })[]
  >();

  useEffect(() => {
    async function loadContracts() {
      try {
        const response = await api.get(`users/contracts/${session?.userId}`);
        setContractList(response.data);
      } catch (error) {
        console.log({ error });
      }
    }
    loadContracts();
  }, [session?.userId]);

  return (
    <Stack alignItems="center" h="full" mt="4">
      <Stack w={["100%", 500]} px="4">
        <Header />
        <Heading>Meus contratos</Heading>
        <Box bg="gray.100" p="2">
          <Text>Filtrar anúncios</Text>
          <RadioGroup
            mt="2"
            onChange={(e) => setFilterSelected(e)}
            value={filterSelected}
          >
            <HStack>
              <Radio value="all" size="sm" defaultChecked colorScheme="blue">
                Todos
              </Radio>
              <Radio value="active" size="sm" colorScheme="blue">
                Ativos
              </Radio>
              <Radio value="inactive" size="sm" colorScheme="blue">
                Inativos
              </Radio>
            </HStack>
          </RadioGroup>
        </Box>
        <Stack>
          {contractsList?.map((contract) => (
            <Flex key={contract.id}>
              <Text>Contract {contract.id}</Text>
              <Text>Service: {contract.service.title}</Text>
            </Flex>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}
