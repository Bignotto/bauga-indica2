import AppInput from "@/components/AppInput";
import AppLogo from "@/components/AppLogo";
import { api } from "@/services/api";
import { Button, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

export default function PhoneValidate() {
  const router = useRouter();
  const { phoneNumber } = router.query;

  const [isValidating, setIsValidating] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  async function handleValidateOtp(event: FormEvent) {
    event.preventDefault();

    setIsValidating(true);
    try {
      const response = await api.post("phone/verify", {
        phone: `+55${phoneNumber}`,
        code: otp,
      });

      const updateResponse = await api.patch("users/phoneVerified", {
        phoneNumber,
      });

      router.push("/users/profile");
    } catch (error) {
      console.log({ error });
      if (error instanceof AxiosError) {
        setOtpError(error.response?.data.message);
        return;
      }
    } finally {
      setIsValidating(false);
    }
  }

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
          <AppInput
            label="Código"
            error={otpError}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <Button
            mt="3"
            colorScheme="blue"
            isLoading={isValidating}
            loadingText="Verificando..."
            onClick={handleValidateOtp}
          >
            Verificar
          </Button>
        </HStack>
      </Stack>
    </Flex>
  );
}
