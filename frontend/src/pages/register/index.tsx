import { Button, Center, Flex, Input } from "@chakra-ui/react";
import logoImg from "../../../public/images/logo.svg";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Register() {
  return (
    <>
      <Head>
        <title>Crie sua conta no BarberPRO</title>
      </Head>
      <Flex
        background={"barber.900"}
        height={"100vh"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Flex width={640} direction={"column"} p={14} rounded={8}>
          <Center p={4}>
            <Image
              src={logoImg}
              quality={100}
              objectFit="fill"
              alt="Logo Braber Pro"
              width={240}
            />
          </Center>
          <Input
            background={"barber.400"}
            variant={"subtle"}
            size={"lg"}
            placeholder="Nome da barbearia"
            type="text"
            mb={3}
          />
          <Input
            background={"barber.400"}
            variant={"subtle"}
            size={"lg"}
            placeholder="email@email.com"
            type="email"
            mb={3}
          />
          <Input
            background={"barber.400"}
            variant={"subtle"}
            size={"lg"}
            placeholder="************"
            type="password"
            mb={6}
          />
          <Button
            background={"button.cta"}
            color={"gray.900"}
            fontWeight={"bold"}
            size={"lg"}
            mb={6}
            _hover={{ bg: "#ffb13e" }}
          >
            Cadastrar
          </Button>

          <Center mt={2}>
            <Link href={"/login"}>
              Já possui uma conta? <strong>Faça o login</strong>
            </Link>
          </Center>
        </Flex>
      </Flex>
    </>
  );
}
