import AppInput from "@/components/AppInput";
import AppLogo from "@/components/AppLogo";
import ContractConfirmation from "@/components/ContractConfirmation";
import Header from "@/components/Header";
import { api } from "@/services/api";
import { Box, Button, Flex, Stack, Text, Textarea } from "@chakra-ui/react";
import { Contract, Message, Service, User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/AuthContext";

type AppContract = Contract & {
  userProvider: User;
  userContractor: User;
  messages: Message[];
  service: Service;
};

export default function ContractMessages() {
  const router = useRouter();
  const { status, session } = useAuth();

  const { contractId } = router.query;

  const [contract, setContract] = useState<AppContract>();
  const [messages, setMessages] = useState<Message[]>([]);

  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadContract() {
      try {
        const response = await api.get(`/contracts/${contractId}`);
        setContract(response.data);
        setMessages(response.data.messages);
      } catch (error) {
        console.log({ error });
      }
    }
    if (status === "unauthenticated") router.push("/");
    if (contractId) loadContract();
  }, [contractId, router, status]);

  async function handleNewMessage() {
    if (message.length === 0) return;
    try {
      const newMessageResponse = await api.post("/contracts/messages/create", {
        contractId,
        userFromId: session?.userId,
        text: message,
      });

      const newMessages = messages.concat(newMessageResponse.data);
      setMessages(newMessages);
      setMessage("");
    } catch (error) {}
  }

  async function handleAcceptContract() {
    try {
      const response = await api.patch("/contracts/contractorAgreed", {
        contractId,
      });

      setContract(response.data);
    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <>
      <Stack alignItems={"center"}>
        <Flex p={"4"} flexDir={"column"} w={["100%", 500]}>
          <Header />
          <Flex alignItems="center" justifyContent="space-between" my="4">
            <AppLogo size="sm" />
          </Flex>

          <Box bg="gray.200" p="1">
            <Text
              fontSize={"md"}
              fontWeight={"bold"}
              bg={"green.600"}
              color={"white"}
              px="1"
            >
              {contract?.service?.title}
            </Text>
            <Text fontSize={"sm"} p="2">
              {contract?.service?.description}
            </Text>
            <Flex justifyContent={"flex-end"}>
              <Text fontSize={"lg"} color={"blue.400"} fontWeight={"bold"}>
                R$ {contract?.service?.value}
              </Text>
            </Flex>
          </Box>

          <Stack mt={"2"}>
            {messages.map((m) => (
              <Flex
                key={m.id}
                flexDir={"row"}
                justifyContent={
                  session?.userId === m.userFromId ? "flex-end" : "flex-start"
                }
              >
                <Flex
                  bg={
                    session?.userId === m.userFromId ? "green.100" : "gray.200"
                  }
                  w={"80%"}
                >
                  <Text fontSize={"sm"} p={"2"}>
                    {m.text}
                  </Text>
                </Flex>
              </Flex>
            ))}
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
              <Button
                colorScheme="teal"
                isDisabled={message.length === 0}
                onClick={handleNewMessage}
              >
                Enviar mensagem
              </Button>
              <ContractConfirmation onConfirm={handleAcceptContract} />
            </Stack>
          </Stack>
        </Flex>
      </Stack>
    </>
  );
}
