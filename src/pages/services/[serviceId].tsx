import Header from "@/components/Header";
import { api } from "@/services/api";
import { Flex, Image, Spinner, Stack, Text } from "@chakra-ui/react";
import { Service, ServiceType, User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
      const response = await api.get(`/services/${serviceId}`);
      console.log(response.data);
      setService(response.data);
      setIsLoading(false);
    }

    loadService();
  }, [serviceId]);

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
          <Text>{service?.description}</Text>{" "}
          <Text fontWeight={"bold"}>{service?.provider.name}</Text>{" "}
          <Text fontSize={"large"} fontWeight={"bold"} color={"blue.500"}>
            R$ {service?.value}
          </Text>
        </Stack>
      )}
    </Stack>
  );
}
