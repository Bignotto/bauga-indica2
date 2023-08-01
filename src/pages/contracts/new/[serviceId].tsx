import AppInput from "@/components/AppInput";
import AppLogo from "@/components/AppLogo";
import Header from "@/components/Header";
import { api } from "@/services/api";
import { Box, Button, Flex, Stack, Text, Textarea } from "@chakra-ui/react";
import { Service, ServiceType, User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/AuthContext";

export default function NewContract() {
  const router = useRouter();
  const { status, session } = useAuth();
  const { serviceId } = router.query;

  const [service, setService] = useState<
    Service & {
      provider: User;
      serviceType: ServiceType;
    }
  >();
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  //NEXT: create new contract into database and create a contract-message page
  useEffect(() => {
    async function loadService() {
      try {
        const response = await api.get(`/services/${serviceId}`);
        setService(response.data);
        setMessage(
          `Olá ${response.data.provider.name}! Gostaria de um orçamento para o serviço descrito acima. Obrigado.`
        );
      } catch (error) {
        console.log({ error });
      } finally {
        setIsLoading(false);
      }
    }
    if (status === "unauthenticated") router.push("/");
    if (serviceId) loadService();
  }, [router, serviceId, status]);

  async function handleSendMessage() {
    if (message.length === 0) return;
    try {
      const newContractResponse = await api.post(`/contracts/create`, {
        serviceId,
        userProviderId: service?.providerId,
        userContractorId: session?.userId,
        value: service?.value,
      });
      //NEXT: implement api route
    } catch (error) {}
  }

  return (
    <Stack alignItems={"center"}>
      <Flex px="4" flexDir="column" w={["100%", 500]}>
        <Header />
        <Flex alignItems="center" justifyContent="space-between" my="4">
          <AppLogo size="sm" />
        </Flex>
        <Text fontSize={"sm"} ml="0.5">
          Contatar <strong>{service?.provider.name}</strong> sobre
        </Text>
        <Box bg="gray.200" p="1">
          <Text
            fontSize={"md"}
            fontWeight={"bold"}
            bg={"green.600"}
            color={"white"}
            px="1"
          >
            {service?.title}
          </Text>
          <Text fontSize={"sm"} p="2">
            {service?.description}
          </Text>
          <Flex justifyContent={"flex-end"}>
            <Text fontSize={"lg"} color={"blue.400"} fontWeight={"bold"}>
              R$ {service?.value}
            </Text>
          </Flex>
        </Box>
        <Stack mt="2">
          <AppInput
            as={Textarea}
            error=""
            label="Mensagem"
            resize={"vertical"}
            fontSize={"sm"}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button colorScheme="green" onClick={handleSendMessage}>
            Enviar mensagem
          </Button>
        </Stack>
        <Text fontSize={"xs"} mt={"2"} bg={"gray.100"} p={"1"}>
          Entre em contato com o prestador para combinar os detalhes para
          execução do serviço descrito.
        </Text>
      </Flex>
    </Stack>
  );
}
