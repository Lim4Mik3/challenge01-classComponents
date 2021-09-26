import { createContext, ReactNode, useContext, useState  } from "react";

interface ModalContextProviderProps {
  children: ReactNode;
}

interface ModalContextProviderData {
  addModalIsOpen: boolean;
  editModalIsOpen: boolean;
  onRequestClose: (modal: string) => void;
  onRequestOpen: (modal: string) => void;
}

const ModalContext = createContext<ModalContextProviderData>({} as ModalContextProviderData);

export function ModalContextProvider({ children }: ModalContextProviderProps) {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleCloseModal = (modal: string) => {
    if (modal === 'add') {
      setAddModalOpen(false)
    } else {
      setEditModalOpen(false)
    }
  }

  const handleOpenModal = (modal: string) => {
    if (modal === 'add') {
      setAddModalOpen(true)
    } else {
      setEditModalOpen(true)
    }
  }

  return (
    <ModalContext.Provider value={{ 
        onRequestClose: handleCloseModal,
        onRequestOpen: handleOpenModal,
        addModalIsOpen: addModalOpen,
        editModalIsOpen: editModalOpen
      }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  const modalContextData = useContext(ModalContext);

  return modalContextData;
}