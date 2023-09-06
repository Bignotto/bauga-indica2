import { Avatar, Box, Flex, Link, Text, theme } from "@chakra-ui/react";
import { Contract, Message, Review, Service, User } from "@prisma/client";
import { format } from "date-fns";
import NextLink from "next/link";
import { FiExternalLink } from "react-icons/fi";
import { MdFileDownloadDone, MdMessage, MdStar } from "react-icons/md";
import { RiToolsFill } from "react-icons/ri";
import { TbCalendar } from "react-icons/tb";

type ContractCardProps = {
  mode: "provider" | "contractor";
  contract: Contract & {
    service: Service;
    userContractor?: User;
    userProvider?: User;
    messages: Message[];
    reviews: Review[];
  };
};

export default function ContractCard({ contract, mode }: ContractCardProps) {
  return (
    <Box bg="gray.200" w={"100%"} p="1">
      <Flex flexDirection={"row"}>
        <Avatar
          name={
            mode === "contractor"
              ? `${contract.userContractor?.name}`
              : `${contract.userProvider?.name}`
          }
          src={
            mode === "contractor"
              ? `${contract.userContractor?.image}`
              : `${contract.userProvider?.image}`
          }
          bg="teal.500"
          size={"md"}
        />
        <Flex flexDir={"column"} w="100%" ml="2" mr="1">
          <Text
            pl={"1"}
            fontSize={"sm"}
            fontWeight={"bold"}
            color={"white"}
            bg={contract.contractorAgreed ? "green.600" : "gray.700"}
            noOfLines={1}
          >
            {contract.service.title}
          </Text>
          <Flex justifyContent={"space-between"} mt="1.5">
            <Flex flexDir={"row"} alignItems={"center"} w="50%">
              <Text
                fontSize={["xx-small", "xs"]}
                fontFamily={"sans-serif"}
                fontWeight={"bold"}
                color={"gray.700"}
                noOfLines={1}
              >
                {mode === "contractor"
                  ? `${contract.userContractor?.name}`
                  : `${contract.userProvider?.name}`}
              </Text>
            </Flex>
            <Flex
              flexDirection={"row"}
              justifyContent={"space-between"}
              w="100%"
            >
              <Flex flexDir={"row"} alignItems={"center"}>
                <TbCalendar color={theme.colors.gray[700]} />
                <Text
                  fontSize={["xx-small", "xs"]}
                  fontFamily={"sans-serif"}
                  fontWeight={"bold"}
                  color={"gray.700"}
                >
                  {format(new Date(contract.createDate), "dd/MM/yyyy")}
                </Text>
              </Flex>
              <Flex flexDir={"row"} alignItems={"center"}>
                <RiToolsFill color={theme.colors.gray[700]} />
                <Text
                  fontSize={["xx-small", "xs"]}
                  fontFamily={"sans-serif"}
                  fontWeight={"bold"}
                  color={"gray.700"}
                >
                  {contract.dueDate
                    ? format(new Date(contract.dueDate!), "dd/MM/yyyy")
                    : `--/--/---`}
                </Text>
              </Flex>
              <Flex flexDir={"row"} alignItems={"center"}>
                {contract.serviceProvided && (
                  <MdFileDownloadDone color={theme.colors.gray[700]} />
                )}
              </Flex>
              <Flex flexDir={"row"} alignItems={"center"}>
                {contract.serviceReviewed && (
                  <>
                    <MdStar color={theme.colors.gray[700]} />
                    <Text
                      fontSize={["xx-small", "xs"]}
                      fontFamily={"sans-serif"}
                      fontWeight={"bold"}
                      color={"gray.700"}
                    >
                      {contract.reviews[0].score}
                    </Text>
                  </>
                )}
              </Flex>
              <Flex flexDir={"row"} alignItems={"center"}>
                <MdMessage color={theme.colors.gray[700]} />
                <Text
                  fontSize={["xx-small", "xs"]}
                  fontFamily={"sans-serif"}
                  fontWeight={"bold"}
                  color={"gray.700"}
                >
                  {contract.messages.length}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Box>
          <Link as={NextLink} href={`/contracts/${contract.id}`}>
            <FiExternalLink
              size={20}
              color={theme.colors.gray[800]}
              fontWeight={"bold"}
            />
          </Link>
        </Box>
      </Flex>
    </Box>
  );

  //RiToolsFill
  //TbCalendarCheck
  //TbCalendar
  //PiToolboxBold
}
