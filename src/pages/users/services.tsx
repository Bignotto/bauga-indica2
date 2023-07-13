import Header from "@/components/Header";
import ServiceCard from "@/components/ServiceCard";
import { api } from "@/services/api";
import {
  Box,
  HStack,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Service, ServiceType, User } from "@prisma/client";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/AuthContext";

export default function Services() {
  const { session } = useAuth();

  const [filterSelected, setFilterSelected] = useState("all");
  const [servicesList, setServicesList] = useState<
    (Service & {
      provider: User;
      serviceType: ServiceType;
    })[]
  >();

  useEffect(() => {
    async function loadUserServices() {
      try {
        const response = await api.get(`users/services/${session?.userId}`);
        setServicesList(response.data);
      } catch (error) {
        console.log({ error });
      }
    }
    loadUserServices();
  }, [session?.userId]);

  return (
    <Stack alignItems="center" h="full" mt="4">
      <Stack w={["100%", 500]} px="4">
        <Header />
        <Heading>Meus serviços</Heading>
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
          {servicesList?.map((service) => (
            <ServiceCard
              key={service.id}
              serviceRating={5}
              serviceObject={service}
            />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}
