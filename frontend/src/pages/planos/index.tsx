import { Sidebar } from "@/components/sidebar";
import { setupAPIClient } from "@/services/api";
// import { getStripeJs } from "@/services/stripe-js";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { Button, Flex, Heading, Text, useMediaQuery } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Head from "next/head";

interface PlanosProps {
  premium: boolean;
}

export default function Planos({ premium }: PlanosProps) {
  const [isMobile] = useMediaQuery(["(max-width: 600px)"]);

  async function handleSubscribe() {
    if (premium) return;

    try {
      const apiClient = setupAPIClient();

      const response = await apiClient.post("/subscribe");

      const { url } = response.data;

      window.location.href = url;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Head>
        <title>BarberPRO - Sua assinatura Premium</title>
      </Head>
      <Sidebar>
        <Flex
          direction={"column"}
          align={"flex-start"}
          justify={"flex-start"}
          w={"100%"}
        >
          <Heading fontSize={"3xl"} my={4} mr={4}>
            Planos
          </Heading>
        </Flex>
        <Flex
          pb={8}
          maxW={"780px"}
          w={"100%"}
          direction={"column"}
          align={"flex-start"}
          justify={"flex-start"}
        >
          <Flex w={"100%"} gap={4} flexDirection={isMobile ? "column" : "row"}>
            <Flex
              rounded={4}
              p={2}
              flex={1}
              bg={"barber.400"}
              flexDirection={"column"}
            >
              <Heading
                fontSize={"2xl"}
                textAlign={"center"}
                mt={2}
                mb={2}
                color={"gray.100"}
              >
                Plano Grátis
              </Heading>
              <Text fontWeight={"medium"} ml={4} mb={2}>
                Registrar cortes.
              </Text>
              <Text fontWeight={"medium"} ml={4} mb={2}>
                Criar apenas 3 modelos de corte.
              </Text>
              <Text fontWeight={"medium"} ml={4} mb={2}>
                Editar dados do perfil.
              </Text>
            </Flex>
            <Flex
              rounded={4}
              p={2}
              flex={1}
              bg={"barber.400"}
              flexDirection={"column"}
            >
              <Heading
                fontSize={"2xl"}
                textAlign={"center"}
                mt={2}
                mb={2}
                color={"#31fb6a"}
              >
                Premium
              </Heading>
              <Text fontWeight={"medium"} ml={4} mb={2}>
                Registrar cortes ilimitados.
              </Text>
              <Text fontWeight={"medium"} ml={4} mb={2}>
                Criar modelos ilimitados.
              </Text>
              <Text fontWeight={"medium"} ml={4} mb={2}>
                Editar dados do perfil.
              </Text>
              <Text fontWeight={"medium"} ml={4} mb={2}>
                Editar modelos de corte.
              </Text>
              <Text fontWeight={"medium"} ml={4} mb={2}>
                Receber todas as atualizações.
              </Text>
              <Text
                fontWeight={"bold"}
                fontSize={"2xl"}
                color={"#31fb6a"}
                ml={4}
                mb={2}
              >
                R$ 9.99
              </Text>
              <Button
                bg={premium ? "black" : "button.cta"}
                m={2}
                color={"white"}
                fontWeight={"bold"}
                disabled={premium}
                onClick={handleSubscribe}
                _hover={{ bg: "gray.700" }}
              >
                {premium ? "VOCÊ JÁ É PREMIUM" : "VIRAR PREMIUM"}
              </Button>
              {premium && (
                <Button
                  m={2}
                  bg={"white"}
                  color={"barber.900"}
                  fontWeight={"bold"}
                  onClick={() => console.log("clicou")}
                  _hover={{ bg: "gray.700" }}
                >
                  ALTERAR ASSINATURA
                </Button>
              )}
            </Flex>
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
      const response = await apiClient.get("/me");

      return {
        props: {
          premium:
            response?.data?.user?.subscriptions?.status === "active"
              ? true
              : false,
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
