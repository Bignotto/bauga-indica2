import Header from "@/components/Header";
import { api } from "@/services/api";
import { Flex, Text } from "@chakra-ui/react";
import { Service, ServiceType, User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SearchResults() {
  const router = useRouter();
  const { searchText } = router.query;

  const [servicesList, setServicesList] = useState<
    (Service & {
      provider: User;
      serviceType: ServiceType;
    })[]
  >();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadServicesList() {
      const response = await api.get(`services/search/${searchText}`);

      if (response) setServicesList(response.data);
      setIsLoading(false);
    }
    loadServicesList();
  }, [searchText]);

  return (
    <Flex height="100vh" alignItems="center" flexDir="column" minW={500}>
      <Header />
      <Flex flexDir="column" w="100%">
        {isLoading && <Text>Carregando</Text>}

        {servicesList &&
          servicesList.map((s) => (
            <Flex key={s.id} flexDir="column">
              <Text>{s.title}</Text>
              <Text>{s.description}</Text>
              <Text>{s.serviceType.name}</Text>
              <Text>{s.provider.name}</Text>
            </Flex>
          ))}
      </Flex>
    </Flex>
  );
}
