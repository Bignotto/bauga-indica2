import { Flex, Heading } from "@chakra-ui/react";
import { GrLike } from "react-icons/gr";

type AppLogoProps = {
  size?: "sm" | "md" | "lg";
};

export default function AppLogo({ size = "md" }: AppLogoProps) {
  const boxSize = size === "lg" ? 70 : size === "md" ? 44 : 18;
  const fontSize = size === "md" ? "22" : size === "lg" ? "36" : "16";

  return (
    <Flex>
      <Heading fontSize={fontSize}>
        Bauga{size !== "sm" ? <br /> : ` `}Indica
      </Heading>
      <Flex alignItems="center" ml={size === "sm" ? "2" : "6"}>
        <GrLike size={boxSize} />
      </Flex>
    </Flex>
  );
}
