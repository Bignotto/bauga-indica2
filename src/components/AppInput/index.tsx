import { Flex, Input, InputProps, Stack, Text } from "@chakra-ui/react";

type AppInputProps = InputProps & {
  label: string;
  error: string | undefined;
};

export default function AppInput({ error, label, ...rest }: AppInputProps) {
  return (
    <Stack w="100%">
      <Text fontSize={"sm"} mb="-1.5">
        {label}:
      </Text>
      <Input
        isInvalid={!!error}
        errorBorderColor="crimson"
        borderColor={"gray.800"}
        _hover={{
          borderColor: "blue.400",
        }}
        borderRadius={"none"}
        {...rest}
      />
      <Flex w="100%" mt="-1.5" h="2">
        <Text fontSize={"x-small"} fontWeight={"bold"} color={"crimson"}>
          {error ?? `\n`}
        </Text>
      </Flex>
    </Stack>
  );
}
