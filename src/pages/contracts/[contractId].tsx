import AppInput from "@/components/AppInput";
import AppLogo from "@/components/AppLogo";
import ContractConfirmation from "@/components/ContractConfirmation";
import Header from "@/components/Header";
import { api } from "@/services/api";
import {
  Box,
  Button,
  Flex,
  Spinner,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Contract, Message, Review, Service, User } from "@prisma/client";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { subDays } from "date-fns";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiClipboardCheck } from "react-icons/hi";
import { useAuth } from "../../hooks/AuthContext";

type AppContract = Contract & {
  userProvider: User;
  userContractor: User;
  messages: Message[];
  service: Service;
  reviews: Review[];
};

export default function ContractMessages() {
  const router = useRouter();
  const { status, session } = useAuth();

  const { contractId } = router.query;

  const [contract, setContract] = useState<AppContract>();
  const [messages, setMessages] = useState<Message[]>([]);

  const [date, setDate] = useState<Date>(new Date());
  const [value, setValue] = useState(0);
  const [message, setMessage] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const minDate = subDays(new Date(), 1);

  useEffect(() => {
    async function loadContract() {
      try {
        setIsLoading(true);
        const response = await api.get(`/contracts/${contractId}`);
        setContract(response.data);
        setMessages(response.data.messages);
        setValue(response.data.value);
        setDate(response.data.dueDate ?? new Date());

        console.log({
          message: "the wrong date",
          date: response.data.dueDate,
        });
      } catch (error) {
        console.log({ error });
      } finally {
        setIsLoading(false);
      }
    }
    if (status === "unauthenticated") router.push("/");
    if (contractId) loadContract();
  }, [contractId, router, status]);

  async function handleSaveTerms() {
    setIsLoading(true);
    try {
      const updatedResponse = await api.patch("/contracts/updateTerms", {
        contractId,
        dueDate: date,
        value,
      });

      setContract(updatedResponse.data);
    } catch (error) {
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleNewMessage() {
    if (message.length === 0) return;
    setIsLoading(true);
    try {
      const newMessageResponse = await api.post("/contracts/messages/create", {
        contractId,
        userFromId: session?.userId,
        text: message,
      });

      const newMessages = messages.concat(newMessageResponse.data);
      setMessages(newMessages);
      setMessage("");
    } catch (error) {
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAcceptContract() {
    try {
      setIsLoading(true);
      const acceptPath =
        session?.userId === contract?.service.providerId
          ? "/contracts/providerAgreed"
          : "/contracts/contractorAgreed";
      const response = await api.patch(acceptPath, {
        contractId,
      });

      setContract(response.data);
    } catch (error) {
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleExecuteContract() {
    try {
      setIsLoading(true);
      const response = await api.patch("/contracts/executeContract", {
        contractId,
      });

      setContract(response.data);
    } catch (error) {
      console.log({ error });
    } finally {
      setIsLoading(false);
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
              bg={contract?.contractorAgreed ? "green.600" : "orange.300"}
              color={"white"}
              px="1"
            >
              {contract?.service?.title}
            </Text>
            <Text fontSize={"sm"} p="2" color={"gray.600"}>
              {contract?.service?.description}
            </Text>
            <Flex justifyContent={"space-between"}>
              <Stack w={"45%"} p="2">
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
                  date={new Date(date)}
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
                      isDisabled: session?.userId !== contract?.userProviderId,
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
              <Flex w="55%" p="2">
                <Flex flexDir={"row"} alignItems={"flex-end"}>
                  <AppInput
                    error=""
                    label="Valor"
                    value={value}
                    onChange={(e) => setMessage(e.target.value)}
                    isDisabled={session?.userId !== contract?.userProviderId}
                  />
                  <Flex mb="2.5" ml="2">
                    <Button
                      colorScheme="teal"
                      onClick={handleSaveTerms}
                      isDisabled={session?.userId !== contract?.userProviderId}
                    >
                      {isLoading ? (
                        <Spinner size={"sm"} />
                      ) : (
                        <HiClipboardCheck size={16} />
                      )}
                    </Button>
                  </Flex>
                </Flex>
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
              <ContractConfirmation
                buttonText={"Combinado!"}
                messageText="Tem certeza que quer aceitar os termos combinados?"
                onConfirm={handleAcceptContract}
                isLoading={isLoading}
                isDisabled={
                  session?.userId === contract?.userContractorId
                    ? //contratante
                      !!contract?.contractorAgreed
                    : //contratado
                      !!contract?.providerAgreed
                }
              />
              {contract?.contractStatus === "executing" &&
                session?.userId === contract?.userProviderId && (
                  <ContractConfirmation
                    buttonText="Executar!"
                    messageText="Confirma a execução e pagamento do serviço combinado?"
                    isLoading={isLoading}
                    onConfirm={handleExecuteContract}
                  />
                )}
              {session?.userId === contract?.userContractorId &&
                contract?.contractStatus === "closed" &&
                !contract.serviceReviewed && (
                  <Button
                    onClick={() => {
                      router.push(`/contracts/review/${contractId}`);
                    }}
                  >
                    Escreva uma avaliação!
                  </Button>
                )}
              {contract?.reviews.map((r) => (
                <>
                  <Box bg="yellow.200" mt="4">
                    <Text>{r.title}</Text>
                    <Text>{r.text}</Text>
                  </Box>
                </>
              ))}
            </Stack>
          </Stack>
        </Flex>
      </Stack>
    </>
  );
}
