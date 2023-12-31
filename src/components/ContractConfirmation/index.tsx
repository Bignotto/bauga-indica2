import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

type ContractConfirmationProps = {
  buttonText: string;
  messageText: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  onConfirm(): void;
};

export default function ContractConfirmation({
  buttonText,
  messageText,
  isDisabled = false,
  isLoading = false,
  onConfirm,
}: ContractConfirmationProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);

  async function handleConfirmation() {
    onConfirm();
    onClose();
  }

  return (
    <>
      <Button colorScheme="green" onClick={onOpen} isDisabled={isDisabled}>
        {isLoading ? <Spinner size={"sm"} /> : <>{buttonText}</>}
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

            <AlertDialogBody>{messageText}</AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme={"gray"} ref={cancelRef} onClick={onClose}>
                Não
              </Button>
              <Button colorScheme={"green"} onClick={handleConfirmation} ml={3}>
                Sim
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
