import { useState, ReactNode } from "react";
import { ModalContext, type ModalSize } from "./ModalContext";

interface ModalProviderProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [content, setContent] = useState<ReactNode | null>(null);
  const [size, setSize] = useState<ModalSize>("sm");
  const [isSlider, setIsSlider] = useState(false);

  const openModal = (content: ReactNode, size: ModalSize = "sm", isSlider = false) => {
    setContent(content);
    setSize(size);
    setIsSlider(isSlider);
    setIsOpen(true);
    setIsClosing(false);
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      setContent(null);
      setSize("sm");
      setIsSlider(false);
    }, 200); // Match the animation duration
  };

  return (
    <ModalContext.Provider value={{ isOpen, isClosing, content, size, isSlider, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}
