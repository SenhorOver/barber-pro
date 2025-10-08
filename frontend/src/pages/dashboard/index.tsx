import { Sidebar } from "@/components/sidebar";
import { setupAPIClient } from "@/services/api";
import { canSSRAuth } from "@/utils/canSSRAuth";
import {
  Button,
  Flex,
  Heading,
  Link as ChakraLink,
  useMediaQuery,
  Text,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { IoMdPerson } from "react-icons/io";

export interface ScheduleItem {
  id: string;
  customer: string;
  haircut: {
    id: string;
    name: string;
    price: string | number;
    user_id: string;
  };
}
interface DashboardProps {
  schedule: ScheduleItem[];
}

export default function Dashboard({ schedule }: DashboardProps) {
  const [isMobile] = useMediaQuery(["(max-width: 600px)"]);

  const [list] = useState(schedule);

  return (
    <>
      <Head>
        <title>BarberPRO - Minha barbearia</title>
      </Head>
      <Sidebar>
        <Flex direction={"column"} align={"flex-start"} justify={"flex-start"}>
          <Flex
            w={"100%"}
            direction={"row"}
            align={"center"}
            justify={"flex-start"}
          >
            <Heading fontSize={"3xl"} mt={4} mb={4} mr={4}>
              Agenda
            </Heading>
            <Link href={"/new"}>
              <Button
                bg={"gray.800"}
                color={"gray.200"}
                fontWeight={"bold"}
                _hover={{ bg: "gray.700" }}
              >
                Registrar
              </Button>
            </Link>
          </Flex>

          {list.map((item) => (
            <ChakraLink
              key={item?.id}
              w={"100%"}
              m={0}
              p={0}
              mt={1}
              bg={"transparent"}
              style={{ textDecoration: "none" }}
            >
              <Flex
                w={"100%"}
                direction={isMobile ? "column" : "row"}
                p={4}
                rounded={4}
                mb={2}
                bg={"barber.400"}
                justify={"space-between"}
                align={"center"}
              >
                <Flex
                  direction={"row"}
                  mb={isMobile ? 2 : 0}
                  align={"center"}
                  justify={"center"}
                >
                  <IoMdPerson size={28} color="#f1f1f1" />
                  <Text fontWeight={"bold"} ml={4}>
                    {item?.customer}
                  </Text>
                </Flex>
                <Text fontWeight={"bold"} mb={isMobile ? 2 : 0}>
                  {item?.haircut?.name}
                </Text>
                <Text fontWeight={"bold"} mb={isMobile ? 2 : 0}>
                  R$ {Number(item?.haircut?.price).toFixed(2)}
                </Text>
              </Flex>
            </ChakraLink>
          ))}
        </Flex>
      </Sidebar>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = canSSRAuth(
  async (ctx) => {
    try {
      const apiClient = setupAPIClient(ctx);
      const response = await apiClient.get("/schedule");

      return {
        props: {
          schedule: response.data,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        props: {
          schedule: [],
        },
      };
    }
  },
);
