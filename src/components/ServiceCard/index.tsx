import { Button, Flex, Tag, Text } from "@chakra-ui/react";
import { FaWhatsapp } from "react-icons/fa";

type ServiceCardProps = {
  name: string;
  description: string;
  serviceType: string;
  username: string;
  serviceRating: number;
};

export default function ServiceCard({
  name,
  description,
  serviceType,
  username,
  serviceRating,
}: ServiceCardProps) {
  return (
    <Flex w="100%" bg="gray.100" flexDir="column" p="2" mt="4">
      <Text fontSize="larger" fontWeight="bold">
        {name}
      </Text>
      <Text>{description}</Text>
      <Flex mt="2">
        <Tag variant="solid" colorScheme="blue">
          {serviceType}
        </Tag>
      </Flex>
      <Flex flexDir="row" justifyContent="space-between" m="2">
        <Text>{username}</Text>
        <Text>{serviceRating}</Text>
      </Flex>
      <Button colorScheme="green" rightIcon={<FaWhatsapp size={20} />}>
        Entrar em contato
      </Button>
    </Flex>
  );
}
