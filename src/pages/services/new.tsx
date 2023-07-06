import AppInput from "@/components/AppInput";
import {
  Button,
  HStack,
  Heading,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { MdInfo } from "react-icons/md";
import * as yup from "yup";
import { useAuth } from "../../hooks/AuthContext";

type FormDataProps = {
  title: string;
  description: string;
  value: number;
  serviceType: number;
};

const serviceSchema = yup.object({
  title: yup.string().required("O nome do serviço é obrigatório."),
  description: yup.string().required("Uma descrição detalhada é obrigatório."),
  value: yup.number().positive("Preço inválido"),
  serviceType: yup.number(),
});

export default function NewService() {
  const router = useRouter();
  const { status } = useAuth();

  const { control, handleSubmit, formState } = useForm<FormDataProps>({
    resolver: yupResolver(serviceSchema),
  });

  const [serviceTypes, setServiceTypes] = useState();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/");
  }, [router, status]);

  async function handleSaveService({
    title,
    description,
    serviceType,
    value,
  }: FormDataProps) {
    console.log({ title, description, serviceType, value });
  }

  return (
    <Stack alignItems="center" h="full" mt="4">
      <Stack w={["100%", 500]} px="4">
        <Heading mb={"2"}>Criar Serviço</Heading>
        <Text fontWeight={"bold"} fontSize={"sm"}>
          Preencha os campos abaixo para criar um serviço.
        </Text>
        <HStack bg="gray.500" p={"4"} color={"#FFFFFF"} my={"2"}>
          <MdInfo size={40} />
          <Text fontSize={"sm"} color={"gray.100"} ml={"2"}>
            Um serviço é tudo aquilo que você pode fazer para o seu cliente.
          </Text>
        </HStack>
        <Controller
          control={control}
          name="title"
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <AppInput
              placeholder="descrição curta"
              label="Nome do serviço"
              error={formState.errors.title?.message}
              value={value}
              onChange={onChange}
              id="title"
            />
          )}
        />
        <Controller
          control={control}
          name="description"
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <AppInput
              as={Textarea}
              placeholder="descreva detalhes do serviço"
              label="Descrição do serviço"
              error={formState.errors.description?.message}
              value={value}
              onChange={onChange}
              id="description"
            />
          )}
        />
        <Controller
          control={control}
          name="value"
          render={({ field: { onChange, value } }) => (
            <AppInput
              placeholder="quanto custa"
              label="Preço do serviço"
              error={formState.errors.value?.message}
              value={value}
              onChange={onChange}
              id="value"
              inputMode="numeric"
            />
          )}
        />
        <HStack justifyContent={"center"}>
          <Button w={"30%"}>Cancelar</Button>
          <Button
            w={"30%"}
            colorScheme="blue"
            onClick={handleSubmit(handleSaveService)}
          >
            Salvar
          </Button>
        </HStack>
      </Stack>
    </Stack>
  );
}
