"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { INavLink } from "@/types";

type NavLinkProps = Pick<INavLink, "icon" | "pathname" | "label">;

const NavLink: React.FC<NavLinkProps> = ({ label, pathname, icon: Icon }) => {
  const path = usePathname();
  const isActive = path === pathname;

  return (
    <Link
      href={pathname}
      className={`flex items-center gap-3 text-gray-600 text-[14px] font-medium py-3 px-6 transition-all duration-300 nav-link ${isActive ? 'active': ''}`}
    >
      {<Icon className={`w-5 h-5 text-gray-400 transition-all duration-300 ${isActive ? 'text-indigo-600': ""}`} />}
      <span>{label}</span>
    </Link>
  );
};

export default NavLink;
