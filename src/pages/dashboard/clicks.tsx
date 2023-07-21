import { api } from "@/services/api";
import { Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Clicks() {
  const [res, setRes] = useState();

  useEffect(() => {
    async function loadClicks() {
      try {
        const response = await api.get("users/clicks");
        console.log({
          response,
        });
        setRes(response.data);
      } catch (error) {}
    }
    loadClicks();
  }, []);

  //NEXT: show results to user
  return (
    <Stack>
      <Text>This is the clicks page</Text>
    </Stack>
  );
}
