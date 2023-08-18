import AppInput from "@/components/AppInput";
import AppLogo from "@/components/AppLogo";
import AppSpacer from "@/components/AppSpacer";
import Header from "@/components/Header";
import { api } from "@/services/api";
import {
  Box,
  Button,
  Flex,
  Heading,
  Select,
  Skeleton,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Contract, Service, User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { useAuth } from "../../../hooks/AuthContext";

type AppContract = Contract & {
  userProvider: User;
  userContractor: User;
  service: Service;
};

type FormDataProps = {
  title: string;
  text: string;
};

const reviewSchema = yup.object({
  title: yup.string().required("Este campo é obrigatório."),
  text: yup.string().required("Este campo é obrigatório."),
});

export default function ContractMessages() {
  const router = useRouter();
  const { status, session } = useAuth();

  const { contractId } = router.query;

  const [contract, setContract] = useState<AppContract>();

  const [isLoading, setIsLoading] = useState(true);

  const [score, setScore] = useState(0);
  const [scoreError, setScoreError] = useState("");

  const { control, handleSubmit, formState } = useForm<FormDataProps>({
    resolver: yupResolver(reviewSchema),
  });

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

  async function handleSaveReview({ text, title }: FormDataProps) {
    if (score === 0) {
      setScoreError("Sua nota sobre o serviço é obrigatório.");
      return;
    }
    setScoreError("");

    //NEXT: save review to database
    console.log({
      text,
      title,
      score,
      message: "everything fine with the form!",
    });
  }

  return (
    <Stack alignItems={"center"}>
      <Flex p={"4"} flexDir={"column"} w={["100%", 500]}>
        <Header />
        <Flex alignItems="center" justifyContent="space-between" my="4">
          <AppLogo size="sm" />
        </Flex>
        <Heading>Avaliação</Heading>
        <Skeleton isLoaded={!isLoading}>
          <Box mt="2" bg="blue.200">
            <Text>Avalie o serviço de {contract?.userProvider.name}.</Text>
            <Flex>
              <Text>{contract?.service.title}</Text>
              <Text>{contract?.service.description}</Text>
            </Flex>
          </Box>
        </Skeleton>
        <Stack mt="2" bg="green.200" flexDir={"column"}>
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value } }) => (
              <AppInput
                label="Diga o que achou do serviço"
                error={formState.errors.title?.message}
                value={value}
                onChange={onChange}
                id="value"
                inputMode="numeric"
              />
            )}
          />
          <Controller
            control={control}
            name="text"
            render={({ field: { onChange, value } }) => (
              <AppInput
                as={Textarea}
                label="Conte tudo sobre o serviço prestado"
                error={formState.errors.text?.message}
                value={value}
                onChange={onChange}
                id="value"
              />
            )}
          />
          <AppSpacer />
          <Select
            placeholder="Sua nota para o serviço"
            borderColor={"gray.800"}
            borderRadius={"none"}
            value={score}
            onChange={(e) =>
              setScore(
                isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value)
              )
            }
            mb={"4"}
            _hover={{
              borderColor: "blue.400",
            }}
          >
            {" "}
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </Select>
          {scoreError.length !== 0 && (
            <Text
              mt={"-5"}
              fontSize={"x-small"}
              fontWeight={"bold"}
              color={"crimson"}
            >
              {scoreError}
            </Text>
          )}
          <Button colorScheme="orange" onClick={handleSubmit(handleSaveReview)}>
            Avaliar!
          </Button>
        </Stack>
      </Flex>
    </Stack>
  );
}
