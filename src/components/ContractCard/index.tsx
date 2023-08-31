import { Flex, Text } from "@chakra-ui/react";

type ContractCardProps = {
  contractId: number;
  contractStatus: string;
};

export default function ContractCard({
  contractId,
  contractStatus,
}: ContractCardProps) {
  return (
    <Flex bg="green.200" w={"100%"}>
      <Text>Contrato: {contractId}</Text>
      <Text> Status: {contractStatus}</Text>
    </Flex>
  );
}
