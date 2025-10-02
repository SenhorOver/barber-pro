import { Sidebar } from "@/components/sidebar";
import { AuthContext } from "@/contexts/AuthContext";
import { setupAPIClient } from "@/services/api";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useContext, useState } from "react";

interface UserProps {
  id: string;
  name: string;
  email: string;
  address: string | null;
}

interface ProfileProps {
  user: UserProps;
  premium: boolean;
}

export default function Profile({ user, premium }: ProfileProps) {
  const { logoutUser } = useContext(AuthContext);

  const [name, setName] = useState(user && user?.name);
  const [address, setAddress] = useState(user?.address ? user.address : "");

  async function handleLogout() {
    await logoutUser();
  }

  async function handleUpdateUser() {
    if (!name) {
      return;
    }

    const apiClient = setupAPIClient();
    try {
      const response = await apiClient.put("/users", {
        name,
        address,
      });

      console.log(response.data);
    } catch {
      console.log("erro");
    }
  }

  return (
    <>
      <Head>
        <title>Minha Conta - BarberPRO</title>
      </Head>
      <Sidebar>
        <Flex
          direction={"column"}
          alignItems={"flex-start"}
          justify={"flex-start"}
        >
          <Flex
            w={"100%"}
            direction={"row"}
            align={"center"}
            justify={"flex-start"}
          >
            <Heading fontSize={"3xl"} mt={4} mb={4} mr={4} color={"orange.900"}>
              Minha Conta
            </Heading>
          </Flex>

          <Flex
            maxW={"700px"}
            w={"100%"}
            direction={"column"}
            align={"center"}
            justify={"center"}
            bg={"barber.400"}
            pt={8}
            pb={8}
          >
            <Flex direction={"column"} w={"85%"}>
              <Text mb={2} fontSize={"xl"} fontWeight={"bold"} color={"white"}>
                Nome da barbearia:
              </Text>
              <Input
                mb={3}
                w={"100%"}
                background={"barber.900"}
                placeholder="Nome da sua barbearia"
                size={"lg"}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Input>
              <Text mb={2} fontSize={"xl"} fontWeight={"bold"} color={"white"}>
                Endereço:
              </Text>
              <Input
                w={"100%"}
                background={"barber.900"}
                placeholder="Endereço da barbearia"
                size={"lg"}
                type="text"
                mb={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></Input>
              <Text mb={2} fontSize={"xl"} fontWeight={"bold"} color={"white"}>
                Plano atual:
              </Text>
              <Flex
                direction={"row"}
                w={"100%"}
                mb={3}
                p={1}
                borderWidth={1}
                rounded={6}
                background={"barber.900"}
                align={"center"}
                justifyContent={"space-between"}
              >
                <Text
                  p={2}
                  fontSize={"lg"}
                  color={premium ? "#fba931" : "#4dffb4"}
                >
                  Plano {premium ? "Premium" : "Grátis"}
                </Text>
                <Link href={"/planos"}>
                  <Box
                    cursor={"pointer"}
                    p={1}
                    pl={2}
                    pr={2}
                    mr={2}
                    background={"#00cd52"}
                    rounded={4}
                    color={"white"}
                  >
                    Mudar plano
                  </Box>
                </Link>
              </Flex>
              <Button
                mt={3}
                mb={4}
                bg={"button.cta"}
                size={"lg"}
                _hover={{ bg: "#ffb133" }}
                onClick={handleUpdateUser}
              >
                Salvar
              </Button>
              <Button
                mb={6}
                bg={"transparent"}
                borderWidth={2}
                borderColor={"red.500"}
                color={"red.500"}
                size={"lg"}
                _hover={{ bg: "transparent" }}
                onClick={handleLogout}
              >
                Sair da conta
              </Button>
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

      console.log(response.data);

      const user = {
        id: response.data.user.id,
        name: response.data.user.name,
        email: response.data.user.email,
        address: response.data.user.address,
      };

      return {
        props: {
          user: user,
          premium:
            response.data?.user?.subscriptions?.status === "active"
              ? true
              : false,
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
