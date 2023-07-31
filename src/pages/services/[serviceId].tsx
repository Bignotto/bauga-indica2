import Header from "@/components/Header";
import { api } from "@/services/api";
import {
  Button,
  Flex,
  HStack,
  Image,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Service, ServiceType, User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsWhatsapp } from "react-icons/bs";

export default function ServiceDetails() {
  const router = useRouter();
  const { serviceId } = router.query;

  const [service, setService] = useState<
    Service & {
      provider: User;
      serviceType: ServiceType;
    }
  >();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadService() {
      try {
        const response = await api.get(`/services/${serviceId}`);
        setService(response.data);
      } catch (error) {
        console.log({ error });
      } finally {
        setIsLoading(false);
      }
    }
    if (serviceId) loadService();
  }, [serviceId]);

  function handleContact() {
    //TODO: need to log this click?
    router.push(`/contracts/new/${service?.id}`);
  }

  return (
    <Stack alignItems={"center"}>
      <Flex h="full" px="4" flexDir="column" w={["100%", 500]}>
        <Header />
      </Flex>
      <Image
        src="https://qewywwsoggiorjqjupal.supabase.co/storage/v1/object/public/images_services/alvenaria%201.jpg"
        alt="User sent service image"
      />
      {isLoading ? (
        <Spinner />
      ) : (
        <Stack h="full" px="4" w={["100%", 500]}>
          <Text fontSize={"2xl"} fontWeight={"bold"} color={"black"}>
            {service?.title}
          </Text>
          <Text>{service?.description}</Text>
          <HStack>
            <Image
              src={service?.provider.image!}
              alt="provider image"
              boxSize={42}
              rounded={"full"}
            />
            <Text fontWeight={"bold"} fontSize={"large"}>
              {service?.provider.name}
            </Text>
          </HStack>
          <Text fontSize={"large"} fontWeight={"bold"} color={"blue.500"}>
            R$ {service?.value}
          </Text>
          <Button
            onClick={handleContact}
            colorScheme="green"
            leftIcon={<BsWhatsapp size={20} />}
          >
            Contato
          </Button>
        </Stack>
      )}
    </Stack>
  );
}

//TODO: implement images list component
