import { canSSRAuth } from "@/utils/canSSRAuth";
import { Flex, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Head from "next/head";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>BarberPRO - Minha barbearia</title>
      </Head>
      <Flex>
        <Text>Bem vindo ao dashboard</Text>
      </Flex>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = canSSRAuth(async () => {
  return {
    props: {},
  };
});
