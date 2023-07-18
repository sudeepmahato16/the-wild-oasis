'use client'
import React, {FC} from "react";
import Link from "next/link";
import Image from "next/image";
import { useDarkMode } from "@/context/DarkModeContext";

interface LogoProps{
  width?: number,
  height?: number
}

const Logo: FC<LogoProps> = ({width=112, height=80}) => {
  const {isDarkMode} = useDarkMode();

  const src = isDarkMode ? "/logo-dark.png": "/logo-light.png"
  return (
    <Link href="/" className="flex justify-center items-center max-h-20 relative">
      <Image
        src={src}
        alt="logo"
        width={width}
        height={height}
      />
    </Link>
  );
};

export default Logo;
