import { Modal, ModalBody, ModalContent } from '@nextui-org/react';

interface ModalProps {
  isOpen: boolean;
  children: string | React.ReactNode | JSX.Element | any;
  className?: string;
  placement?: 'center' | 'auto' | 'top' | 'top-center' | 'bottom' | 'bottom-center' | undefined;
  size?: 'lg' | 'sm' | 'md' | 'full' | 'xs' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | undefined;
  onClose?: () => void;
}

export const ModalSimple = ({ isOpen, children, ...restProps }: ModalProps) => {
  return (
    <Modal isOpen={isOpen} {...restProps} hideCloseButton>
      <ModalContent>{() => <ModalBody>{children}</ModalBody>}</ModalContent>
    </Modal>
  );
};
