import { createContext, useContext } from "react";

export const ModalContext = createContext({
  opened: false,
  handleOpenModal: () => {},
  handleCloseModal: () => {},
});

export function useModalContext() {
  return useContext(ModalContext);
}