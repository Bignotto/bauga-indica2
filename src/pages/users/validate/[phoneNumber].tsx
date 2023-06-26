import AppInput from "@/components/AppInput";
import AppLogo from "@/components/AppLogo";
import { Button, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function PhoneValidate() {
  const router = useRouter();
  const { phoneNumber } = router.query;

  //NEXT: Validate phone number!

  return (
    <Flex justifyContent={"center"}>
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        h="100vh"
        w={["100%", 500]}
      >
        <AppLogo size="lg" />
        <Text my="6">
          Enviamos um SMS com um código para {phoneNumber}.<br />
          Preencha o campo abaixo com este código para validar sua conta.
        </Text>
        <HStack alignItems={"center"}>
          <AppInput label="Código" error={undefined} />
          <Button mt="3" colorScheme="blue">
            Verificar
          </Button>
        </HStack>
      </Stack>
    </Flex>
  );
}
