import { api } from "@/services/api";
import { Button, Flex, Tag, Text } from "@chakra-ui/react";
import { Service, ServiceType, User } from "@prisma/client";
import { useRouter } from "next/router";
import { FormEvent } from "react";
import { BsInfoSquare } from "react-icons/bs";
import { useAuth } from "../../hooks/AuthContext";

type ServiceCardProps = {
  serviceRating: number;
  serviceObject?: Service & {
    provider: User;
    serviceType: ServiceType;
  };
};

export default function ServiceCard({
  serviceRating,
  serviceObject,
}: ServiceCardProps) {
  const { session } = useAuth();
  const router = useRouter();

  async function handleSeeDetails(event: FormEvent) {
    event.preventDefault();

    await api.post("log", {
      event: "click",
      subject: serviceObject?.id,
      data: "",
      userId: session?.userId,
      userProvider: serviceObject?.providerId,
    });

    router.push(`/services/${serviceObject?.id}`);
  }

  function handleEditService(event: FormEvent) {
    event.preventDefault();

    router.push(`/services/edit/${serviceObject?.id}`);
  }

  return (
    <Flex w="100%" bg="gray.100" flexDir="column" p="2" mt="4">
      <Text fontSize="larger" fontWeight="bold">
        {serviceObject?.title}
      </Text>
      <Text>{serviceObject?.description}</Text>
      <Flex mt="2">
        <Tag variant="solid" colorScheme="blue">
          {serviceObject?.serviceType.name}
        </Tag>
      </Flex>
      <Flex flexDir="row" justifyContent="space-between" my={"2"}>
        <Text>{serviceObject?.provider.name}</Text>
        <Text>{serviceRating}</Text>
      </Flex>
      <Flex flexDir={"column"}>
        <Text fontSize={"lg"} fontWeight={"bold"} color={"blue.500"}>
          R$ {serviceObject?.value}
        </Text>
        {session?.userId === serviceObject?.providerId ? (
          <Button
            onClick={handleEditService}
            colorScheme="green"
            rightIcon={<BsInfoSquare size={20} />}
            w="100%"
          >
            Editar Serviço
          </Button>
        ) : (
          <Button
            onClick={handleSeeDetails}
            colorScheme="blue"
            rightIcon={<BsInfoSquare size={20} />}
            w="100%"
          >
            Ver mais detalhes
          </Button>
        )}
      </Flex>
    </Flex>
  );
}
