"use client"
import BodyModal from "@/components/atoms/body-modal";
import HeaderModal from "@/components/atoms/header-modal";
import { Modal } from "@mantine/core";
import { createContext, useCallback, useEffect, useState } from "react";


interface ModalProviderProps {
  opened: boolean;
  handleOpenModal: (dto: IModalDto) => void;
  handleCloseModal: () => void;
}

interface ModalState {
  content: React.ReactNode;
  header?: string | null;
  opened: boolean;
}

export const ModalContext = createContext<ModalProviderProps | null>(null);

interface IModalDto {
  content: React.ReactNode;
  header?: string;
}

export default function ModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [{ content, opened, header }, setModalState] = useState<ModalState>({ content: null, header: null, opened: false });

  const handleOpenModal = useCallback((dto: IModalDto) => {
    setModalState({ content: dto.content, header: dto.header || null, opened: true });
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalState(prev => ({ ...prev, opened: false }));
  }, []);

  useEffect(() => {
    console.log("Modal state changed:", { opened });
  }, [opened]);

  return (
    <ModalContext.Provider value={{ opened, handleOpenModal, handleCloseModal }}>
      <Modal.Root opened={opened} onClose={handleCloseModal} centered size="lg">
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header className="p-0!">
            {header ? <HeaderModal title={header} /> : <Modal.CloseButton />}
          </Modal.Header>
          <Modal.Body className="p-0!">
            {content && <BodyModal>{content}</BodyModal>}
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
      {children}
    </ModalContext.Provider>
  );
}
