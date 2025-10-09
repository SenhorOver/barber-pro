// "use client";

import { ScheduleItem } from "@/pages/dashboard";
import {
  Button,
  Dialog,
  Flex,
  Portal,
  Text,
  createOverlay,
} from "@chakra-ui/react";
import { FaMoneyBillAlt } from "react-icons/fa";
import { FiScissors, FiUser } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

interface DialogProps {
  data: ScheduleItem;
  handleFinish: (id: string) => Promise<void>;
}

export const dialog = createOverlay<DialogProps>((props) => {
  const { data, handleFinish, ...rest } = props;
  return (
    <Dialog.Root {...rest}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bg={"barber.400"}>
            <Dialog.Header>
              <Dialog.Title>Próximo</Dialog.Title>
              <Dialog.CloseTrigger cursor={"pointer"}>
                <IoClose size={28} />
              </Dialog.CloseTrigger>
            </Dialog.Header>

            <Dialog.Body spaceY="4">
              <Flex align={"center"} mb={3}>
                <FiUser size={28} color="#ffb13e" />
                <Text
                  ml={3}
                  fontSize={"2xl"}
                  fontWeight={"bold"}
                  color={"white"}
                >
                  {data?.customer}
                </Text>
              </Flex>
              <Flex align={"center"} mb={3}>
                <FiScissors size={28} color="#fff" />
                <Text ml={3} fontSize={"large"} color={"white"}>
                  {data?.haircut?.name}
                </Text>
              </Flex>
              <Flex align={"center"} mb={3}>
                <FaMoneyBillAlt size={28} color="#46ef75" />
                <Text ml={3} fontSize={"large"} color={"white"}>
                  R$ {Number(data?.haircut?.price).toFixed(2)}
                </Text>
              </Flex>
            </Dialog.Body>
            <Dialog.Footer>
              <Button
                bg={"button.cta"}
                _hover={{ bg: "#ffb13e" }}
                color={"#fff"}
                mr={3}
                onClick={() => handleFinish(data?.id)}
              >
                Finalizar Serviço
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
});
