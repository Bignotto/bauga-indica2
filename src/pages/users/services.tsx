import Header from "@/components/Header";
import ServiceCard from "@/components/ServiceCard";
import {
  Box,
  Button,
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
        <Box bg="gray.200" p="2">
          <Text>Filtrar anúncios</Text>
          <RadioGroup
            mt="2"
            onChange={(e) => setFilterSelected(e)}
            value={filterSelected}
            colorScheme="blue"
          >
            <HStack>
              <Radio value="all" size="sm" defaultChecked>
                Todos
              </Radio>
              <Radio value="active" size="sm">
                Ativos
              </Radio>
              <Radio value="inactive" size="sm">
                Inativos
              </Radio>
            </HStack>
          </RadioGroup>
        </Box>
        <Button onClick={() => console.log({ filterSelected })}>teste</Button>
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
