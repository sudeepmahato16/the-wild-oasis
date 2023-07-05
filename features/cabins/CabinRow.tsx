"use client";
import React from "react";
import Image from "next/image";
import { Cabin } from "@prisma/client";

import CreateCabinForm from "./CreateCabinForm";
import Modal from "@/components/Modal";

import { useDeleteCabin } from "./hooks/useDeleteCabin";
import { useCreateOrEditCabin } from "./hooks/useCreateOrEditCabin";
import { formatCurrency } from "@/utils/helpers";

interface CabinRowProps {
  cabin: Cabin;
}

const CabinRow: React.FC<CabinRowProps> = ({ cabin }) => {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { createOrEditCabin, isWorking } = useCreateOrEditCabin();
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;

  const handleDuplicate = () => {
    createOrEditCabin({
      name: `${name} copy`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  };

  return (
    <div className="table-row transition-none py-2 px-6 border-b border-grey-100 [&:not(:last-child)]:border-b-0">
      <Image
        src={image}
        alt={name}
        width={75}
        height={48}
        className="scale-[1.3] -translate-x-[12px] w-auto h-auto"
      />

      <h4 className="text-[16px] font-sono text-gray-600 font-semibold">
        {name}
      </h4>
      <span className="text-gray-500 text-[12.75px]">
        Fits up to {maxCapacity} guests
      </span>
      <span className="font-sono font-semibold">
        {formatCurrency(regularPrice)}
      </span>
      {discount ? (
        <span className="font-sono font-medium text-green-700">
          {formatCurrency(discount)}
        </span>
      ) : (
        <span>&mdash;</span>
      )}

      <div className="flex flex-row items-center gap-2">
        <button type="button" onClick={handleDuplicate} disabled={isWorking}>
          Duplicate
        </button>
        <Modal>
          <Modal.Open opens="edit">
            <button type="button">Edit</button>
          </Modal.Open>
          <Modal.Window name="edit">
            <CreateCabinForm cabin={cabin} />
          </Modal.Window>
          <button
            type="button"
            disabled={isDeleting}
            onClick={() => deleteCabin(id)}
          >
            Delete
          </button>
        </Modal>
      </div>
    </div>
  );
};

export default CabinRow;
