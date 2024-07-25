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
    <Modal
      isOpen={isOpen}
      className="bg-[#1A1A1A]"
      classNames={{
        closeButton:
          'bg-transparent hover:bg-transparent active:bg-transparent outline-none focus:outline-none hover:border-0 hover:outline-none',
      }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-softWhite">{title}</ModalHeader>
            <ModalBody className="text-softWhite">{content}</ModalBody>
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
