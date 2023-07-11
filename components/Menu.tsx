"use client";
import React, { FC, createContext, useContext, useState } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import { IconType } from "react-icons/lib";

interface MenusProps {
  children: React.ReactNode;
}

const Toggle = ({ id }: { id: string }) => {
  const { openId, close, open, setPosition } = useContext(MenuContext);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = (e.target as Element)
      ?.closest("button")
      ?.getBoundingClientRect();

    if (rect) {
      setPosition({
        x: window.innerWidth - rect.width - rect.x,
        y: rect.y + rect.height + 8,
      });
    }

    if (openId === "" || openId !== id) {
      open(id);
    } else {
      close();
    }
  };

  return (
    <button
      type="button"
      className="bg-none border-none p-1 rounded-md translate-x-2 transition-all duration-200 hover:bg-gray-100 toggle-svg"
      onClick={handleClick}
    >
      <HiEllipsisVertical className="w-6 h-6 stroke-gray-700" />
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
    <li>
      <button
        disabled={disabled}
        onClick={handleClick}
        className="w-full text-left bg-none border-none py-3 px-5 text-[13.25px] transition-all duration-200 flex items-center gap-4 hover:bg-gray-50"
        type="button"
      >
        <Icon className="w-4 h-4 stroke-gray-700" />
        <span>{children}</span>
      </button>
    </li>
  );
};

const List = ({ id, children }: { id: string; children: React.ReactNode }) => {
  const { openId, position, close } = useContext(MenuContext);
  const { ref } = useOutsideClick(close);

  if (openId !== id) return null;

  return (
    <ul
      ref={ref}
      className="fixed bg-white shadow-md rounded-md z-[9999] text-[12px]"
      style={{ right: `${position?.x}px`, top: `${position?.y}px` }}
    >
      {children}
    </ul>
  );
};

const MenuContext = createContext({
  openId: "",
  open: (id: string) => {},
  close: () => {},
  position: null as { x: number; y: number } | null,
  setPosition: (val: { x: number; y: number } | null) => {},
});

const Menu: FC<MenusProps> & {
  Toggle: typeof Toggle;
  Button: typeof Button;
  List: typeof List;
} = ({ children }) => {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState<null | { x: number; y: number }>(
    null
  );
  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenuContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      <div className="flex items-center justify-end">{children}</div>
    </MenuContext.Provider>
  );
};

Menu.Toggle = Toggle;
Menu.Button = Button;
Menu.List = List;

export default Menu;
