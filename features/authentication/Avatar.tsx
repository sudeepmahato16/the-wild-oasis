import React from "react";
import Image from "next/image";

interface AvatarProps {
  image: string | null | undefined;
  name: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ image, name }) => {
  return (
    <div className="flex gap-3 items-center font-medium text-[14px] text-gray-600">
      <Image
        src={image || "/default-user.jpg"}
        alt={name || "user-image"}
        width={30}
        height={30}
        className="rounded-full outline-2 outline-gray-100 object-cover"
      />
      <span>{name}</span>
    </div>
  );
};

export default Avatar;
