import AppInput from "@/components/AppInput";
import Header from "@/components/Header";
import { api } from "@/services/api";
import {
  Button,
  Flex,
  Select,
  Spinner,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Service, ServiceType, User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BsSave } from "react-icons/bs";
import * as yup from "yup";
import { useAuth } from "../../../hooks/AuthContext";

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
    .min(1, "Preço é obrigatório")
    .transform((value) =>
      isNaN(value) || value === null || value === undefined ? 0 : value
    ),
  serviceType: yup.number().required("Escolha um tipo de serviço."),
});

export default function EditService() {
  const router = useRouter();
  const { serviceId } = router.query;

  const [service, setService] = useState<
    Service & {
      provider: User;
      serviceType: ServiceType;
    }
  >();
  const { status } = useAuth();

  const { control, handleSubmit, formState, setValue } = useForm<FormDataProps>(
    {
      resolver: yupResolver(serviceSchema),
    }
  );

  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadService() {
      try {
        const serviceResponse = await api.get(`/services/${serviceId}`);
        setService(serviceResponse.data);

        setValue("title", `${serviceResponse.data.title}`);
        setValue("description", `${serviceResponse.data.description}`);
        setValue("value", serviceResponse.data.value);

        setValue("serviceType", serviceResponse.data.serviceTypeId);

        const response = await api.get("services/types");
        setServiceTypes(response.data);
      } catch (error) {
        console.log({ error });
      } finally {
        setIsLoading(false);
      }
    }
    if (status === "unauthenticated") router.push("/");
    if (serviceId && status === "authenticated") loadService();
  }, [router, serviceId, setValue, status]);

  return (
    <Stack alignItems={"center"}>
      <Flex h="full" px="4" flexDir="column" w={["100%", 500]}>
        <Header />
      </Flex>
      {isLoading ? (
        <Spinner />
      ) : (
        <Stack h="full" px="4" w={["100%", 500]}>
          <Text fontSize={"2xl"} fontWeight={"bold"} color={"black"}>
            Editando serviço
          </Text>

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
                id="name"
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
          <Button colorScheme="blue" leftIcon={<BsSave size={18} />}>
            Salvar
          </Button>
        </Stack>
      )}
    </Stack>
  );
}

//NEXT: save to database
