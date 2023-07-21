"use client";
import React from "react";

import NavLink from "./NavLink";
import { navLinks } from "@/utils/constants";

const MainNav = () => {
  return (
    <nav>
      <ul className="flex flex-col gap-2">
        {navLinks.map(({ label, icon, id, pathname }) => (
          <li key={id}>
            <NavLink label={label} icon={icon} pathname={pathname} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MainNav;
