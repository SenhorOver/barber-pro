import {
  Box,
  CloseButton,
  Flex,
  Icon,
  IconButton,
  Text,
  useDisclosure,
  FlexProps,
  BoxProps,
  Drawer,
} from "@chakra-ui/react";
import { FiClipboard, FiMenu, FiScissors, FiSettings } from "react-icons/fi";
import { IconType } from "react-icons";
import Link from "next/link";
import React from "react";

interface LinkItemsProps {
  name: string;
  icon: IconType;
  route: string;
}

const linkItems: LinkItemsProps[] = [
  { name: "Agenda", icon: FiScissors, route: "/dashboard" },
  { name: "Cortes", icon: FiClipboard, route: "/haircuts" },
  { name: "Minha Conta", icon: FiSettings, route: "/profile" },
];

export function Sidebar({ children }: { children: React.ReactNode }) {
  const { open, onOpen, onClose } = useDisclosure();

  return (
    <Box minH={"100vh"} bg={"barber.900"}>
      <SidebarContent
        onClose={() => onClose()}
        display={{ base: "none", md: "block" }}
      />
      <Drawer.Root
        open={open}
        onOpenChange={onOpen}
        placement={"start"}
        restoreFocus={false}
        size={"full"}
      >
        <Drawer.Content>
          <SidebarContent onClose={() => onClose()} />
        </Drawer.Content>
      </Drawer.Root>

      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p={4}>
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg={"barber.400"}
      borderRight={"1px"}
      borderRightColor={"gray.200"}
      w={{ base: "full", md: "60" }}
      pos={"fixed"}
      h={"full"}
      {...rest}
    >
      <Flex h={"20"} align={"center"} justify={"space-between"} mx={8}>
        <Link href={"/dashboard"}>
          <Flex cursor={"pointer"} userSelect={"none"} flexDirection={"row"}>
            <Text fontSize={"2xl"} fontFamily={"monospace"} fontWeight={"bold"}>
              Barber
            </Text>
            <Text
              fontSize={"2xl"}
              fontFamily={"monospace"}
              fontWeight={"bold"}
              color={"button.cta"}
            >
              PRO
            </Text>
          </Flex>
        </Link>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      {linkItems.map((link) => (
        <NavItem icon={link.icon} route={link.route} key={link.name}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: React.ReactNode;
  route: string;
}

const NavItem = ({ icon, children, route, ...rest }: NavItemProps) => {
  return (
    <Link href={route} style={{ textDecoration: "none" }}>
      <Flex
        align={"center"}
        p={"4"}
        mx={"4"}
        borderRadius={"lg"}
        role="group"
        cursor={"pointer"}
        _hover={{ bg: "barber.900", color: "white" }}
        {...rest}
      >
        {icon && (
          <Icon
            mr={4}
            fontSize={"16"}
            as={icon}
            _groupHover={{ color: "white" }}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height={"20"}
      alignItems={"center"}
      bg={"#161A24"}
      justifyContent={"flex-start"}
      borderBottom={"sm"}
      borderColor={"gray.700"}
      {...rest}
    >
      <IconButton
        variant={"outline"}
        as={FiMenu}
        onClick={onOpen}
        borderColor={"gray.700"}
        aria-label="open menu"
        size={"md"}
        padding={"10px"}
        _hover={{ backgroundColor: "#292C34" }}
      />

      <Flex flexDirection={"row"} justify={"center"} width={"full"}>
        <Text fontSize={"2xl"} fontFamily={"monospace"} fontWeight={"bold"}>
          Barber
        </Text>
        <Text
          fontSize={"2xl"}
          fontFamily={"monospace"}
          fontWeight={"bold"}
          color={"button.cta"}
        >
          PRO
        </Text>
      </Flex>
    </Flex>
  );
};
