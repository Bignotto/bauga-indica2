import AppInput from "@/components/AppInput";
import AppLogo from "@/components/AppLogo";
import ContractConfirmation from "@/components/ContractConfirmation";
import Header from "@/components/Header";
import { api } from "@/services/api";
import { Box, Button, Flex, Stack, Text, Textarea } from "@chakra-ui/react";
import { Contract, Message, Service, User } from "@prisma/client";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { subDays } from "date-fns";
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

  const [date, setDate] = useState(new Date());
  const [value, setValue] = useState(0);
  const [message, setMessage] = useState("");

  const minDate = subDays(new Date(), 1);

  useEffect(() => {
    async function loadContract() {
      try {
        const response = await api.get(`/contracts/${contractId}`);
        setContract(response.data);
        setMessages(response.data.messages);
        setValue(response.data.value);
        setDate(response.data.dueDate ?? new Date());
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
            <Text fontSize={"sm"} p="2" color={"gray.600"}>
              {contract?.service?.description}
            </Text>
            <Flex justifyContent={"space-between"}>
              <Stack w={"50%"} p="2">
                <Text fontSize={"sm"} mb="-1.5">
                  Data do serviço:
                </Text>
                <SingleDatepicker
                  //TODO: date picker: create a component with a better style
                  configs={{
                    dateFormat: "dd/MM/yyyy",
                  }}
                  minDate={minDate}
                  name="date-input"
                  date={date}
                  onDateChange={setDate}
                  propsConfigs={{
                    dayOfMonthBtnProps: {
                      defaultBtnProps: {
                        colorScheme: "blue",
                        borderColor: "gray.600",
                        _hover: {
                          background: "blue.100",
                        },
                      },
                    },
                    inputProps: {
                      errorBorderColor: "crimson",
                      borderColor: "gray.800",
                      _hover: {
                        borderColor: "blue.400",
                      },
                      borderRadius: "none",
                    },
                  }}
                />
              </Stack>
              <Flex w="50%" p="2">
                <AppInput
                  error=""
                  label="Valor do serviço"
                  value={value}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Flex>
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
