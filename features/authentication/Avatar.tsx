import React from "react";
import Image from "next/image";

interface AvatarProps {
  image: string | null | undefined;
  name: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ image, name }) => {
  const imgSrc = !!image ?  "/default-user.jpg" : image;

  return (
    <div className="flex gap-[10px] items-center font-medium text-[14px] text-gray-600 duration-200 dark:text-gray-300">
      <div className="rounded-full w-7 h-7 relative">
      <Image
        src={imgSrc as string}
        alt={name || "user-image"}
        fill
        className="rounded-full outline-2 outline-gray-100 dark:outline-gray-800 object-cover object-center"
        />
        </div>
      <span>{name}</span>
    </div>
  );
};

export default Avatar;
