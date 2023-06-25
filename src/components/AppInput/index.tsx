import { Input, InputProps, Stack, Text } from "@chakra-ui/react";

type AppInputProps = InputProps & {
  label: string;
  error: string | null;
};

export default function AppInput({ error, label, ...rest }: AppInputProps) {
  return (
    <Stack w="100%">
      <Text fontSize={"sm"}>{label}:</Text>
      <Input borderColor={error ? "red.500" : "blue.400"} {...rest} />
    </Stack>
  );
}
