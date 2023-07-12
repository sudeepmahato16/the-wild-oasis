import React, {FC} from "react";
import Link from "next/link";
import Image from "next/image";

interface LogoProps{
  width?: number,
  height?: number
}

const Logo: FC<LogoProps> = ({width=112, height=80}) => {
  return (
    <Link href="/" className="flex justify-center items-center max-h-20 relative">
      <Image
        src="/logo-light.png"
        alt="logo"
        width={width}
        height={height}
      />
    </Link>
  );
};

export default Logo;
