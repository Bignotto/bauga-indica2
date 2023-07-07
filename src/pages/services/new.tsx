import AppInput from "@/components/AppInput";
import { api } from "@/services/api";
import {
  Button,
  HStack,
  Heading,
  Select,
  Spinner,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { ServiceType } from "@prisma/client";
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
  value: yup
    .number()
    .required("Preço é obrigatório")
    .positive("Preço inválido")
    .min(1, "Preo é obrigatório")
    .transform((value) =>
      isNaN(value) || value === null || value === undefined ? 0 : value
    ),
  serviceType: yup.number().required("Escolha um tipo de serviço."),
});

export default function NewService() {
  const router = useRouter();
  const { status } = useAuth();

  const { control, handleSubmit, formState, setValue } = useForm<FormDataProps>(
    {
      resolver: yupResolver(serviceSchema),
    }
  );

  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadServiceTypes() {
      try {
        const response = await api.get("services/types");
        setServiceTypes(response.data);
        setValue("serviceType", response.data[0].id ?? 1);
      } catch (error) {
        console.log({ error });
      } finally {
        setIsLoading(false);
      }
    }
    if (status === "unauthenticated") router.push("/");
    if (status === "authenticated") loadServiceTypes();
  }, [router, status, setValue]);

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

        {isLoading ? (
          <Spinner />
        ) : (
          <Controller
            control={control}
            name="serviceType"
            render={({ field: { onChange, value } }) => (
              <>
                <Text fontSize={"sm"}>Tipo de serviço:</Text>
                <Select
                  borderColor={"gray.800"}
                  value={value}
                  onChange={onChange}
                  mb={"4"}
                  _hover={{
                    borderColor: "blue.400",
                  }}
                >
                  {serviceTypes.map((t) => (
                    <option value={t.id} key={t.id}>
                      {t.name}
                    </option>
                  ))}
                </Select>
              </>
            )}
          />
        )}

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
        <HStack justifyContent={"center"} mt={"2"}>
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
