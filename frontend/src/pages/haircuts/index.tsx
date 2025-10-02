import { Sidebar } from "@/components/sidebar";
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
import Head from "next/head";
import Link from "next/link";
import { IoMdPricetag } from "react-icons/io";

export default function Haircuts() {
  const [isMobile] = useMediaQuery(["(max-width: 600px)"]);

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
              <Switch.Root size={"lg"}>
                <Switch.Label fontWeight={"bold"}>ATIVOS</Switch.Label>
                <Switch.HiddenInput />
                <Switch.Control />
              </Switch.Root>
            </Stack>
          </Flex>

          <Box width="100%">
            <Link href={"/haircuts/123"}>
              <Flex
                cursor={"pointer"}
                w={"100%"}
                p={4}
                bg={"barber.400"}
                direction={"row"}
                rounded={"4px"}
                mb={2}
                justify={"space-between"}
              >
                <Flex direction={"row"} align={"center"} justify={"center"}>
                  <IoMdPricetag size={28} color="#fba931" />
                  <Text fontWeight={"bold"} color="white" ml={4}>
                    Corte completo
                  </Text>
                </Flex>
                <Text fontWeight={"bold"} color="white">
                  Preço: R$ 59.90
                </Text>
              </Flex>
            </Link>
          </Box>
        </Flex>
      </Sidebar>
    </>
  );
}
