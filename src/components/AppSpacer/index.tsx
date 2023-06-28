import { Flex } from "@chakra-ui/react";

type AppSpacerProps = {
  height?: "min" | "md" | "lg" | "xlg";
  width?: "min" | "md" | "lg" | "xlg";
};

const sizes = {
  min: "2",
  md: "4",
  lg: "6",
  xlg: "8",
};

export default function AppSpacer({
  width = "min",
  height = "min",
}: AppSpacerProps) {
  return <Flex w={sizes[width]} h={sizes[height]} />;
}
