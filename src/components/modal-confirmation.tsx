import { Modal, ModalBody, ModalContent, ModalHeader, ModalFooter, Button } from '@nextui-org/react';

interface ModalProps {
  isOpen: boolean;
  title: string;
  content: string | React.ReactNode | JSX.Element | any;
  onClose: () => void;
  onOk: () => void;
  onOkText: string;
}

export const ModalConfirmation = ({ isOpen, title, content, onClose, onOk, onOkText }: ModalProps) => {
  return (
    <Modal isOpen={isOpen} className="bg-[#1A1A1A]">
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>{content}</ModalBody>
            <ModalFooter>
              <Button color="secondary" variant="light" onPress={onClose}>
                Cerrar
              </Button>
              <Button color="danger" onPress={onOk}>
                {onOkText}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
