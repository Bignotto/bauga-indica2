import AppLogo from "@/components/AppLogo";
import Header from "@/components/Header";
import { api } from "@/services/api";
import { Flex, Stack } from "@chakra-ui/react";
import { Contract, Service, User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/AuthContext";

type AppContract = Contract & {
  userProvider: User;
  userContractor: User;
  service: Service;
};

export default function ContractMessages() {
  const router = useRouter();
  const { status, session } = useAuth();

  const { contractId } = router.query;

  const [contract, setContract] = useState<AppContract>();

  const [date, setDate] = useState<Date>(new Date());
  const [value, setValue] = useState(0);
  const [message, setMessage] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadContract() {
      try {
        setIsLoading(true);
        const response = await api.get(`/contracts/${contractId}`);
        setContract(response.data);
      } catch (error) {
        console.log({ error });
      } finally {
        setIsLoading(false);
      }
    }
    if (status === "unauthenticated") router.push("/");
    if (contractId) loadContract();
  }, [contractId, router, status]);

  return (
    <Stack alignItems={"center"}>
      <Flex p={"4"} flexDir={"column"} w={["100%", 500]}>
        <Header />
        <Flex alignItems="center" justifyContent="space-between" my="4">
          <AppLogo size="sm" />
        </Flex>
      </Flex>
    </Stack>
  );
}
