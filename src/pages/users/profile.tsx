import AppInput from "@/components/AppInput";
import AppLogo from "@/components/AppLogo";
import AppSpacer from "@/components/AppSpacer";
import { api } from "@/services/api";
import {
  Avatar,
  Button,
  Flex,
  Heading,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Account, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import * as yup from "yup";

type FormDataProps = {
  name: string;
  email: string;
  phone: string;
};

const profileSchema = yup.object({
  name: yup.string().required("Seu nome é obrigatório."),
  email: yup
    .string()
    .email("Não parece ser um endereço de e-mail válido.")
    .required("Um endereço de e-mail é obrigatório."),
  phone: yup
    .string()
    .matches(
      new RegExp("[0-9]{11}"),
      "Não parece um número de telefone válido."
    )
    .required("Você precisa de um número de telefone para validar sua conta."),
});

export default function Profile() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [userProfile, setUserProfile] = useState<
    User & {
      accounts: Account[];
    }
  >();
  const [isLoading, setIsLoading] = useState(true);

  const { control, handleSubmit, formState, setValue } = useForm<FormDataProps>(
    {
      resolver: yupResolver(profileSchema),
    }
  );

  //TODO: encapsulate this in a hook
  useEffect(() => {
    async function loadUserProfile() {
      try {
        const response = await api.get(`users/${session?.user?.email}`);
        setUserProfile(response.data);
        setValue("name", response.data.name ?? "");
        setValue("email", response.data.email ?? "");
        setValue("phone", response.data.phone ?? "");
        console.log("loaded user again");
      } catch (error) {
        console.log({ error });
      } finally {
        setIsLoading(false);
      }
    }

    if (status === "authenticated") loadUserProfile();
    if (status === "unauthenticated") router.push("/");
  }, [status]);

  async function handleSaveProfile({ name, email, phone }: FormDataProps) {
    //NEXT: update user registry!!
    console.log({ name, phone, email });
    try {
      const otpResponse = await api.post("phone/send-code", {
        phone: `+55${phone}`,
      });
      if (otpResponse.data.success) router.push(`/users/validate/${phone}`);
    } catch (error) {}
  }

  return (
    <Stack alignItems={"center"}>
      <Flex
        alignItems="center"
        flexDir="column"
        w={["100%", 500]}
        px="4"
        mt="2"
      >
        <AppLogo />
        <Flex bg="gray.800" h={0.5} w="100%" my="4" />
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Avatar
              src={userProfile?.image!}
              name={userProfile?.name!}
              size={"2xl"}
            />
            <Text fontWeight={"bold"} fontSize={"lg"} mt="4">
              Perfil público de
            </Text>
            <Heading>{userProfile?.name}</Heading>
            <Text>{userProfile?.accounts[0].provider}</Text>
            <Stack w="full" mt="4">
              <Controller
                control={control}
                name="name"
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <AppInput
                    placeholder="Seu nome"
                    label="Nome completo"
                    error={formState.errors.name?.message}
                    value={value}
                    onChange={onChange}
                    id="name"
                  />
                )}
              />
              <AppSpacer />
              <Controller
                control={control}
                name="email"
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <AppInput
                    placeholder="endereco@email.com"
                    label="Endereço de e-mail"
                    error={formState.errors.email?.message}
                    value={value}
                    onChange={onChange}
                    id="email"
                    isDisabled={userProfile?.accounts[0].provider === "google"}
                  />
                )}
              />
              <AppSpacer />
              <Controller
                control={control}
                name="phone"
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <AppInput
                    placeholder="99877665544"
                    label="Seu número de telefone com DDD"
                    error={formState.errors.phone?.message}
                    value={value}
                    onChange={onChange}
                    id="phone"
                  />
                )}
              />
              <AppSpacer />
              <Button
                colorScheme="blue"
                onClick={handleSubmit(handleSaveProfile)}
                isDisabled={!formState.isDirty}
              >
                Salvar
              </Button>
            </Stack>
          </>
        )}
      </Flex>
    </Stack>
  );
}
