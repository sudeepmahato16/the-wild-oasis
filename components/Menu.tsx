"use client";
import React, { FC, createContext, useCallback, useContext, useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import { IconType } from "react-icons/lib";
import useOutsideClick from "@/hooks/useOutsideClick";
import { useKeyPress } from "@/hooks/useOnKeyPress";

interface MenusProps {
  children: React.ReactNode;
}

const Toggle = ({ id }: { id: string }) => {
  const { openId, close, open, setOffsetTop } = useContext(MenuContext);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOffsetTop((e.target as Element)?.getBoundingClientRect().top)

    openId === "" || openId !== id ? open(id) : close();
  };

  return (
    <button
      type="button"
      className="bg-none border-none p-1 rounded-md translate-x-2 transition-all duration-200 dark:hover:bg-gray-800 hover:bg-gray-100"
      onClick={handleClick}
    >
      <HiEllipsisVertical className="w-6 h-6 stroke-gray-700 dark:stroke-gray-200 dark:text-gray-200" />
    </button>
  );
};

interface ButtonProps {
  children: React.ReactNode;
  icon: IconType;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  icon: Icon,
  onClick,
  disabled = false,
}) => {
  const { close } = useContext(MenuContext);

  const handleClick = () => {
    onClick?.();
    close();
  };

  return (
    <li className="min-w-[180px]">
      <button
        disabled={disabled}
        onClick={handleClick}
        className="w-full text-left bg-none border-none py-3 px-5 text-[13.25px] transition-all duration-200 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-900"
        type="button"
      >
        <Icon className="w-4 h-4 stroke-gray-700 text-gray-700 dark:text-gray-200 dark:stroke-gray-200" />
        <span className="dark:text-gray-300 ">{children}</span>
      </button>
    </li>
  );
};

const List = ({ id, children }: { id: string; children: React.ReactNode }) => {
  const { openId, close, offsetTop } = useContext(MenuContext);
  const { ref } = useOutsideClick(close, false, openId===id);
  useKeyPress("Escape", close, openId===id);

  if (openId !== id) return null;

  return (
    <ul
      ref={ref}
      className={`absolute ${(window.innerHeight - offsetTop) > 200 ? "top-[120%]": "bottom-[90%]"}  right-[10%] w-auto bg-white dark:bg-black shadow-md rounded-md z-[9999] text-[12px]`}
    >
      {children}
    </ul>
  );
};

const MenuContext = createContext({
  openId: "",
  open: (id: string) => {},
  close: () => {},
  offsetTop: 0,
  setOffsetTop: (val: number) => {}
});

const Menu: FC<MenusProps> & {
  Toggle: typeof Toggle;
  Button: typeof Button;
  List: typeof List;
} = ({ children }) => {
  const [openId, setOpenId] = useState("");
  const [offsetTop, setOffsetTop] = useState(0);

  const close = useCallback(() => setOpenId(""), []);
  const open = setOpenId;

  return (
    <MenuContext.Provider
      value={{ openId, close, open, offsetTop, setOffsetTop }}
    >
      <div className="flex items-center justify-end relative">{children}</div>
    </MenuContext.Provider>
  );
};

Menu.Toggle = Toggle;
Menu.Button = Button;
Menu.List = List;

export default Menu;
