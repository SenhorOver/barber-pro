import { Button, Center, Flex, Input } from "@chakra-ui/react";
import logoImg from "../../../public/images/logo.svg";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";

export default function Login() {
  const { singIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    singIn({ email, password });
  }

  return (
    <>
      <Head>
        <title>BarberPro - Faça login para acessar</title>
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
            placeholder="email@email.com"
            type="email"
            mb={3}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            background={"barber.400"}
            variant={"subtle"}
            size={"lg"}
            placeholder="************"
            type="password"
            mb={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            background={"button.cta"}
            color={"gray.900"}
            fontWeight={"bold"}
            size={"lg"}
            mb={6}
            _hover={{ bg: "#ffb13e" }}
            onClick={handleLogin}
          >
            Acessar
          </Button>

          <Center mt={2}>
            <Link href={"/register"}>
              Ainda não possui conta? <strong>Cadastre-se</strong>
            </Link>
          </Center>
        </Flex>
      </Flex>
    </>
  );
}
