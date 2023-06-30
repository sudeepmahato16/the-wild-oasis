import React from "react";
import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href="/" className="flex justify-center items-center max-h-20 relative">
      <Image
        src="/logo-light.png"
        alt="logo"
        width={112}
        height={80}
      />
    </Link>
  );
};

export default Logo;
