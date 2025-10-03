import { Sidebar } from "@/components/sidebar";
import { setupAPIClient } from "@/services/api";
import { canSSRAuth } from "@/utils/canSSRAuth";
import {
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  Switch,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";

interface EditHaircutProps {
  subscription: SubscriptionProps;
  haircut: HaircutProps;
}

interface HaircutProps {
  id: string;
  name: string;
  price: string | number;
  status: boolean;
  user_id: string;
}

interface SubscriptionProps {
  id: string;
  status: string;
}

export default function New({ subscription, haircut }: EditHaircutProps) {
  const [isMobile] = useMediaQuery(["(max-widht: 500px)"]);

  const [name, setName] = useState(haircut?.name);
  const [price, setPrice] = useState(haircut?.price);
  const [status, setStatus] = useState(haircut?.status);
  const [disableHaircut, setDisableHaircut] = useState(
    haircut?.status ? "disabled" : "enabled",
  );

  async function handleUpdate() {
    if (!name || !price || !Number(price)) {
      return;
    }

    try {
      const apiClient = setupAPIClient();
      await apiClient.put("/haircut", {
        name,
        price: Number(price),
        status,
        haircut_id: haircut?.id,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDisabled(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value === "disabled") {
      setDisableHaircut("enabled");
      setStatus(false);
    } else {
      setDisableHaircut("disabled");
      setStatus(true);
    }
  }

  return (
    <>
      <Head>
        <title>BarberPRO - Editar modelo de corte</title>
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
              Editar modelo
            </Heading>

            <Input
              placeholder="Nome do corte"
              size={"lg"}
              type="text"
              w={"85%"}
              bg={"barber.900"}
              mb={3}
              disabled={subscription?.status !== "active"}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Valor do corte ex: 59.90"
              size={"lg"}
              type="text"
              w={"85%"}
              bg={"barber.900"}
              mb={3}
              disabled={subscription?.status !== "active"}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <Stack align={"flex-start"} w={"85%"} mb={6} direction={"row"}>
              <Switch.Root
                size={"lg"}
                colorPalette={"red"}
                value={disableHaircut}
                checked={disableHaircut === "disabled" ? false : true}
              >
                <Switch.Label fontSize={"md"} fontWeight={"bold"}>
                  Desativar corte
                </Switch.Label>
                <Switch.HiddenInput
                  disabled={subscription?.status !== "active"}
                  onChange={(e) => handleDisabled(e)}
                />
                <Switch.Control
                  cursor={
                    subscription?.status !== "active" ? "disabled" : "pointer"
                  }
                />
              </Switch.Root>
            </Stack>
            <Button
              disabled={subscription?.status !== "active"}
              w={"85%"}
              size={"lg"}
              color={"gray.900"}
              mb={6}
              bg={"button.cta"}
              _hover={{ bg: "#ffb13e" }}
              onClick={handleUpdate}
            >
              Salvar
            </Button>

            {subscription?.status !== "active" && (
              <Flex
                direction={"row"}
                align={"center"}
                justify={"center"}
                px={4}
              >
                <Link href={"/planos"}>
                  <Text
                    fontWeight={"bold"}
                    color={"#31fb6a"}
                    cursor={"pointer"}
                    mr={1}
                  >
                    Seja premium
                  </Text>
                </Link>
                <Text> e tenha todos os acessos liberados</Text>
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
      const haircut = await apiClient.get("/haircut/detail", {
        params: {
          haircut_id: ctx.params?.id,
        },
      });
      console.log(haircut.data);
      return {
        props: {
          subscription: response.data?.subscriptions,
          haircut: haircut.data,
        },
      };
    } catch (err) {
      console.log(err);
      return {
        redirect: {
          destination: "/haircuts",
          permanent: false,
        },
      };
    }
  },
);
