import AppInput from "@/components/AppInput";
import { HStack, Heading, Stack, Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useEffect } from "react";
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
  title: yup.string(),
  description: yup.string(),
  value: yup.number(),
  serviceType: yup.number(),
});

export default function NewService() {
  const router = useRouter();
  const { status } = useAuth();

  const { control, handleSubmit, formState } = useForm<FormDataProps>({
    resolver: yupResolver(serviceSchema),
  });

  useEffect(() => {
    if (status === "unauthenticated") router.push("/");
  }, [router, status]);

  return (
    <Stack alignItems="center" h="full" mt="4">
      <Stack w={["100%", 500]} px="4">
        <Heading mb={"2"}>Criar Serviço</Heading>
        <Text fontWeight={"bold"} fontSize={"sm"}>
          Preencha os campos abaixo para criar um serviço.
        </Text>
        <HStack bg="gray.500" px={"2"} color={"#FFFFFF"} my={"2"}>
          <MdInfo size={40} />
          <Text fontSize={"sm"} color={"gray.100"}>
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
      </Stack>
    </Stack>
  );
}
