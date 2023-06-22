import { Button, Flex, Tag, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FormEvent } from "react";
import { BsInfoSquare } from "react-icons/bs";

type ServiceCardProps = {
  id: string;
  name: string;
  description: string;
  serviceType: string;
  username: string;
  serviceRating: number;
  value: number;
};

export default function ServiceCard({
  id,
  name,
  description,
  serviceType,
  username,
  serviceRating,
  value,
}: ServiceCardProps) {
  const router = useRouter();

  function handleSeeDetails(event: FormEvent) {
    event.preventDefault();

    router.push(`/service/${id}`);
  }
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
      <Flex
        justifyContent="space-between"
        alignItems={"baseline"}
        flexDirection={["column", "row"]}
      >
        <Text fontSize={"lg"} fontWeight={"bold"} color={"blue.500"}>
          R$ {value}
        </Text>
        <Button
          onClick={handleSeeDetails}
          colorScheme="green"
          rightIcon={<BsInfoSquare size={20} />}
        >
          Ver mais detalhes
        </Button>
      </Flex>
    </Flex>
  );
}
