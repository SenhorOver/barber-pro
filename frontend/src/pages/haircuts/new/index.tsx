import { Sidebar } from "@/components/sidebar";
import { setupAPIClient } from "@/services/api";
import { canSSRAuth } from "@/utils/canSSRAuth";
import {
  Button,
  Flex,
  Heading,
  Input,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";

interface NewHaircutProps {
  subscription: boolean;
  count: number;
}

export default function New({ subscription, count }: NewHaircutProps) {
  const [isMobile] = useMediaQuery(["(max-widht: 500px)"]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  async function handleRegister() {
    if (!name || !price) {
      return;
    }

    if (!Number(price)) {
      return;
    }

    try {
      const apiClient = setupAPIClient();
      await apiClient.post("/haircut", {
        name,
        price: Number(price),
      });

      console.log("cadastrado");
    } catch {
      console.log("erro");
    }
  }

  return (
    <>
      <Head>
        <title>BarberPRO - Novo modelo de corte</title>
      </Head>
      <Sidebar>
        <Flex direction="column" align={"flex-start"} justify={"flex-start"}>
          <Flex
            direction={isMobile ? "column" : "row"}
            w={"100%"}
            align={isMobile ? "flex-start" : "center"}
            mb={isMobile ? 4 : 0}
          >
            <Link href="/haircuts">
              <Button
                bg={"gray.800"}
                color={"white"}
                fontWeight={"bold"}
                gap={0}
                p={4}
                pl={2.5}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                mr={4}
              >
                <FiChevronLeft size={24} color="white" />
                Voltar
              </Button>
            </Link>
            <Heading
              color={"orange.900"}
              my={4}
              mr={4}
              fontSize={isMobile ? "28px" : "3xl"}
            >
              Modelos de corte
            </Heading>
          </Flex>
          <Flex
            maxW={"700px"}
            bg={"barber.400"}
            w={"100%"}
            align={"center"}
            justify={"center"}
            py={8}
            direction={"column"}
          >
            <Heading
              mb={4}
              color={"white"}
              fontSize={isMobile ? "22px" : "3xl"}
            >
              Cadastrar modelo
            </Heading>

            <Input
              placeholder="Nome do corte"
              size={"lg"}
              type="text"
              w={"85%"}
              bg={"barber.900"}
              mb={3}
              disabled={!subscription && count >= 3}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Valor do corte ex: 59.90"
              size={"lg"}
              type="text"
              w={"85%"}
              bg={"barber.900"}
              mb={4}
              disabled={!subscription && count >= 3}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <Button
              disabled={!subscription && count >= 3}
              w={"85%"}
              size={"lg"}
              color={"gray.900"}
              mb={6}
              bg={"button.cta"}
              _hover={{ bg: "#ffb13e" }}
              onClick={handleRegister}
            >
              Cadastrar
            </Button>

            {!subscription && count >= 3 && (
              <Flex direction={"row"} align={"center"} justify={"center"}>
                <Text>Você atingiu o seu limite de corte.</Text>
                <Link href={"/planos"}>
                  <Text
                    fontWeight={"bold"}
                    color={"#31fb6a"}
                    cursor={"pointer"}
                    ml={1}
                  >
                    Seja premium
                  </Text>
                </Link>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Sidebar>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = canSSRAuth(
  async (ctx) => {
    try {
      const apiClient = setupAPIClient(ctx);
      const response = await apiClient.get("/haircut/check");
      const count = await apiClient.get("/haircut/count");
      return {
        props: {
          subscription:
            response.data?.subscriptions?.status === "active" ? true : false,
          count: count.data,
        },
      };
    } catch (err) {
      console.log(err);
      return {
        redirect: {
          destination: "/dashboard",
          permanent: false,
        },
      };
    }
  },
);
