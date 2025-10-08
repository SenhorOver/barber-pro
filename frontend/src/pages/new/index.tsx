import { Sidebar } from "@/components/sidebar";
import { setupAPIClient } from "@/services/api";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { Button, Flex, Heading, Input, NativeSelect } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useState } from "react";

interface HaircutProps {
  id: string;
  name: string;
  price: string | number;
  status: boolean;
  user_id: string;
}

interface NewProps {
  haircuts: HaircutProps[];
}

export default function New({ haircuts }: NewProps) {
  const [customer, setCustomer] = useState("");
  const [haircutSelected, setHaircutSelected] = useState(haircuts[0]);

  function handleChangeSelect(id: string) {
    const haircutItem = haircuts.find((item) => item.id === id);
    setHaircutSelected(haircutItem!);
  }

  async function handleRegister() {
    if (!customer) {
      return;
    }
    try {
      const apiClient = setupAPIClient();
      await apiClient.post("/schedule", {
        customer,
        haircut_id: haircutSelected?.id,
      });
      console.log("Agendado com sucesso!");
    } catch {
      return;
    }
  }

  return (
    <>
      <Head>
        <title>BarberPRO - Novo agendamento</title>
      </Head>
      <Sidebar>
        <Flex direction={"column"} align={"flex-start"} justify={"flex-start"}>
          <Flex
            direction={"row"}
            w={"100%"}
            align={"center"}
            justify={"flex-start"}
          >
            <Heading fontSize={"3xl"} my={4} mr={4}>
              Novo corte
            </Heading>
          </Flex>

          <Flex
            maxW={"700px"}
            py={8}
            width={"100%"}
            direction={"column"}
            align={"center"}
            justify={"center"}
            bg={"barber.400"}
          >
            <Input
              placeholder="Nome do cliente"
              w={"85%"}
              mb={3}
              size={"lg"}
              type="text"
              bg={"barber.900"}
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
            />
            <NativeSelect.Root bg={"barber.900"} mb={3} size={"lg"} w={"85%"}>
              <NativeSelect.Field
                onChange={(e) => handleChangeSelect(e.target.value)}
              >
                {haircuts?.map((item) => (
                  <option value={item?.id} key={item?.id}>
                    {item?.name}
                  </option>
                ))}
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>

            <Button
              w={"85%"}
              size={"lg"}
              color={"gray.900"}
              bg={"button.cta"}
              _hover={{ bg: "#ffb13e" }}
              onClick={handleRegister}
            >
              Agendar
            </Button>
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
