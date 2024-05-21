"use client";
import React, {
  ReactNode,
  cloneElement,
  useContext,
  useState,
  createContext,
  ReactElement,
  useEffect,
  useCallback,
  memo,
} from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from 'framer-motion'
import { HiXMark } from "react-icons/hi2";

import useOutsideClick from "@/hooks/useOutsideClick";
import { useKeyPress } from "@/hooks/useOnKeyPress";
import { fadeIn, slideIn } from "@/utils/motion";

const ModalContext = createContext({
  open: (openName: string) => { },
  close: () => { },
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
  const { ref } = useOutsideClick(close, true, name === openName);

  useKeyPress("Escape", close, name === openName)

  return createPortal(
    <AnimatePresence>
      {name === openName && <motion.div variants={fadeIn(0.2)} initial="hidden" animate="show" exit="hidden" className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.3)] backdrop-blur-sm z-50 ">
        <motion.div
          ref={ref}
          variants={slideIn("down", "tween", 0.2)} initial="hidden" animate="show" exit="hidden"
          className="bg-white dark:bg-black rounded-lg shadow-lg py-8 px-10"
        >
          <button
            type="button"
            className="bg-none border-none py-1 rounded-md translate-x-2 transition-all duration-200 absolute top-3 right-5"
            onClick={close}
          >
            <HiXMark className="w-6 h-6 stroke-gray-500 text-gray-500 dark:text-gray-400" />
          </button>
          {cloneElement(children, { onCloseModal: close })}
        </motion.div>
      </motion.div>}
    </AnimatePresence>
    ,
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

  useEffect(() => {
    const body = document.body;
    if (openName) {
      const scrollTop = document.documentElement.scrollTop;
      body.style.top = `-${scrollTop}px`;
      body.classList.add("noscroll");
    } else {
      const top = parseFloat(body.style.top) * -1
      body.classList.remove("noscroll");
      if (top) {
        document.documentElement.scrollTop = top;
        body.style.top = "";
      }
    }
  }, [openName]);

  const close = useCallback(() => {
    setOpenName("");
  }, []);

  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ open, close, openName }}>
      {children}
    </ModalContext.Provider>
  );
};

Modal.Open = Open;
Modal.Window = memo(Window);

export default Modal;
