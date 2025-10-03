import { Sidebar } from "@/components/sidebar";
import { setupAPIClient } from "@/services/api";
import { canSSRAuth } from "@/utils/canSSRAuth";
import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Switch,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { IoMdPricetag } from "react-icons/io";

interface HaircutsItems {
  id: string;
  name: string;
  price: number | string;
  status: boolean;
  user_id: string;
}
interface HaircutsProps {
  haircuts: HaircutsItems[];
}

export default function Haircuts({ haircuts }: HaircutsProps) {
  const [isMobile] = useMediaQuery(["(max-width: 600px)"]);
  const [haircutList, setHaircutList] = useState(haircuts || []);
  const [disableHaircut, setDisableHaircut] = useState("enabled");

  async function handleDisabled(e: React.ChangeEvent<HTMLInputElement>) {
    const apiClient = setupAPIClient();
    if (e.target.value === "disabled") {
      setDisableHaircut("enabled");
      const response = await apiClient.get("/haircuts", {
        params: {
          status: true,
        },
      });

      setHaircutList(response.data);
    } else {
      setDisableHaircut("disabled");
      const response = await apiClient.get("/haircuts", {
        params: {
          status: false,
        },
      });

      setHaircutList(response.data);
    }
  }

  return (
    <>
      <Head>
        <title>Modelos de corte - Minha barbearia</title>
      </Head>
      <Sidebar>
        <Flex
          direction={"column"}
          alignItems={"flex-start"}
          justify={"flex-start"}
        >
          <Flex
            direction={isMobile ? "column" : "row"}
            w={"100%"}
            align={isMobile ? "flex-start" : "center"}
            justify={"flex-start"}
            mb={0}
          >
            <Heading
              fontSize={isMobile ? "28px" : "3xl"}
              my={4}
              mr={4}
              color={"orange.900"}
            >
              Modelos de corte
            </Heading>
            <Link href={"/haircuts/new"}>
              <Button bg={"gray.800"} color={"gray.100"} fontWeight={"bold"}>
                Cadastrar novo
              </Button>
            </Link>
            <Stack ml={"auto"} align={"center"} direction={"row"}>
              <Switch.Root
                size={"lg"}
                value={disableHaircut}
                checked={disableHaircut === "disabled" ? false : true}
              >
                <Switch.Label fontWeight={"bold"}>ATIVOS</Switch.Label>
                <Switch.HiddenInput onChange={(e) => handleDisabled(e)} />
                <Switch.Control />
              </Switch.Root>
            </Stack>
          </Flex>

          {haircutList.map((haircut) => (
            <Box width="100%" mt={isMobile ? 4 : 0} key={haircut.id}>
              <Link href={`/haircuts/${haircut.id}`}>
                <Flex
                  cursor={"pointer"}
                  w={"100%"}
                  p={4}
                  bg={"barber.400"}
                  direction={isMobile ? "column" : "row"}
                  align={"center"}
                  rounded={"4px"}
                  mb={2}
                  justify={"space-between"}
                >
                  <Flex
                    mb={isMobile ? 2 : 0}
                    direction={"row"}
                    align={"center"}
                    justify={"center"}
                  >
                    <IoMdPricetag size={28} color="#fba931" />
                    <Text fontWeight={"bold"} color="white" ml={4}>
                      {haircut.name}
                    </Text>
                  </Flex>
                  <Text fontWeight={"bold"} color="white">
                    Preço: R$ {Number(haircut.price).toFixed(2)}
                  </Text>
                </Flex>
              </Link>
            </Box>
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

      const response = await apiClient.get("/haircuts", {
        params: {
          status: true,
        },
      });

      if (response.data === null) {
        return {
          redirect: {
            destination: "/dashboard",
            permanent: false,
          },
        };
      }
      return {
        props: {
          haircuts: response.data,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        redirect: {
          destination: "/dashboard",
          permanent: false,
        },
      };
    }
  },
);
