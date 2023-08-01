import AppInput from "@/components/AppInput";
import AppLogo from "@/components/AppLogo";
import Header from "@/components/Header";
import { api } from "@/services/api";
import { Button, Flex, Stack, Text, Textarea } from "@chakra-ui/react";
import { Service, ServiceType, User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function NewContract() {
  const router = useRouter();
  const { serviceId } = router.query;

  const [service, setService] = useState<
    Service & {
      provider: User;
      serviceType: ServiceType;
    }
  >();
  const [isLoading, setIsLoading] = useState(true);

  //NEXT: create new contract into database and create a contract-message page
  useEffect(() => {
    async function loadService() {
      try {
        const response = await api.get(`/services/${serviceId}`);
        setService(response.data);
      } catch (error) {
        console.log({ error });
      } finally {
        setIsLoading(false);
      }
    }
    if (serviceId) loadService();
  }, [serviceId]);

  return (
    <Stack alignItems={"center"}>
      <Flex px="4" flexDir="column" w={["100%", 500]}>
        <Header />
        <Flex alignItems="center" justifyContent="space-between" my="4">
          <AppLogo size="md" />
        </Flex>
        <Text fontSize={"sm"}>
          Contatar <strong>{service?.provider.name}</strong> sobre
        </Text>
        <Text fontSize={"lg"} fontWeight={"bold"}>
          {service?.title}
        </Text>
        <Stack mt="2">
          <AppInput
            as={Textarea}
            error=""
            label="Mensagem"
            resize={"vertical"}
          />
          <Button colorScheme="green">Enviar mensagem</Button>
        </Stack>
      </Flex>
    </Stack>
  );
}
