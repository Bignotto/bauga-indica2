import Header from "@/components/Header";
import ServiceCard from "@/components/ServiceCard";
import {
  Box,
  HStack,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

export default function Services() {
  const [filterSelected, setFilterSelected] = useState("all");
  return (
    <Stack alignItems="center" h="full" mt="4">
      <Stack w={["100%", 500]} px="4">
        <Header />
        <Heading>Meus serviços</Heading>
        <Box bg="gray.100" p="2">
          <Text>Filtrar anúncios</Text>
          <RadioGroup
            mt="2"
            onChange={(e) => setFilterSelected(e)}
            value={filterSelected}
          >
            <HStack>
              <Radio value="all" size="sm" defaultChecked colorScheme="blue">
                Todos
              </Radio>
              <Radio value="active" size="sm" colorScheme="blue">
                Ativos
              </Radio>
              <Radio value="inactive" size="sm" colorScheme="blue">
                Inativos
              </Radio>
            </HStack>
          </RadioGroup>
        </Box>
        <Stack>
          <ServiceCard
            description="Este é o teste de descrição do serviço que pode ser bastante longa ou até menos longa, desde que tenha pelo menos três linhas, e um pouco mais."
            id="1"
            name="Servico 1"
            serviceRating={5}
            serviceType="Jardinagem"
            username="Eu mesmo"
            value={200}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
