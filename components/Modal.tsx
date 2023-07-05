"use client";
import React, {
  ReactNode,
  cloneElement,
  useContext,
  useState,
  createContext,
  ReactElement,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import useOutsideClick from "@/hooks/useOutsideClick";

const ModalContext = createContext({
  open: (openName: string) => {},
  close: () => {},
  openName: "",
});

interface OpenProps {
  children: ReactElement;
  opens: string;
}

const Open: React.FC<OpenProps> = ({ children, opens }) => {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opens) });
};

interface WindowProps {
  children: ReactElement;
  name: string;
}

const Window: React.FC<WindowProps> = ({ children, name }) => {
  const { openName, close } = useContext(ModalContext);
  const { ref } = useOutsideClick(close);
  if (name !== openName) return null;

  return createPortal(
    <div
      className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.3)] backdrop-blur-sm z-50 transition-all duration-500"
    >
      <div     ref={ref} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg py-8 px-10 transition-all duration-500">
        <button
          type="button"
          className="bg-none border-none py-1 rounded-md translate-x-2 transition-all duration-200 absolute top-3 right-5"
          onClick={close}
        >
          <HiXMark className="w-6 h-6 stroke-gray-500 text-gray-500" />
        </button>
        {cloneElement(children, { onCloseModal: () => close() })}
      </div>
    </div>,
    document.body
  );
};

interface ModalProps {
  children: ReactNode;
}

const Modal: React.FC<ModalProps> & {
  Open: typeof Open;
  Window: typeof Window;
} = ({ children }) => {
  const [openName, setOpenName] = useState("");

  const close = () => {
    setOpenName("");
  };

  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ open, close, openName }}>
      {children}
    </ModalContext.Provider>
  );
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
