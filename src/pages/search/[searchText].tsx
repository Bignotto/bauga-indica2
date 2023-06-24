import AppLogo from "@/components/AppLogo";
import Header from "@/components/Header";
import ServiceCard from "@/components/ServiceCard";
import { api } from "@/services/api";
import { Flex, Spinner, Stack, Text } from "@chakra-ui/react";
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
    <Stack alignItems={"center"}>
      <Flex px="4" flexDir="column" w={["100%", 500]}>
        <Header />
        <Flex alignItems="center" justifyContent="space-between" my="4">
          <AppLogo size="md" />
          <Text>Encontrados {servicesList?.length} serviços</Text>
        </Flex>
        <Flex flexDir="column" w="100%">
          {isLoading && <Spinner colorScheme="blue" />}

          {servicesList &&
            servicesList.map((s) => (
              <ServiceCard
                id={s.id}
                name={s.title}
                description={s.description}
                serviceRating={5}
                serviceType={s.serviceType.name}
                username={s.provider.name ?? "desconhecido"}
                value={s.value}
                key={s.id}
              />
            ))}
        </Flex>
      </Flex>
    </Stack>
  );
}
