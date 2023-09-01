import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { FiExternalLink } from "react-icons/fi";

type ContractCardProps = {
  contractId: number;
  contractStatus: string;
  contractorAgreed: boolean | null;
  contractorImage: string;
  serviceTitle: string;
  contractorName: string;
};

export default function ContractCard({
  contractId,
  contractStatus,
  contractorAgreed,
  contractorImage,
  serviceTitle,
  contractorName,
}: ContractCardProps) {
  return (
    <Box bg="gray.200" w={"100%"}>
      <Flex flexDirection={"row"}>
        <Avatar
          name={contractorName}
          src={contractorImage}
          bg="teal.500"
          size={"md"}
        />
        <Box w="100%" bg={contractorAgreed ? "green.600" : "gray.700"}>
          <Text color={"white"}>{serviceTitle}</Text>
        </Box>
        <Box>
          <FiExternalLink size={24} color="#FFFFFF" />
        </Box>
      </Flex>

      <Text> Status: {contractStatus}</Text>
    </Box>
  );
}
