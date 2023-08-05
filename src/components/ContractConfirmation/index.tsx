import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

export default function ContractConfirmation() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);

  return (
    <>
      <Button colorScheme="green" onClick={onOpen}>
        Aceitar contrato
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirma
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza que quer aceitar os termos combinados
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme={"gray"} ref={cancelRef} onClick={onClose}>
                Não
              </Button>
              <Button colorScheme="red" onClick={onClose} ml={3}>
                Sim
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
