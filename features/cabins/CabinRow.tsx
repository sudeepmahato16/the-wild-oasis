"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Cabin } from "@prisma/client";

import CreateCabinForm from "./CreateCabinForm";

import { deleteCabin } from "@/services/apiCabin";
import { formatCurrency } from "@/utils/helpers";

interface CabinRowProps {
  cabin: Cabin;
}

const CabinRow: React.FC<CabinRowProps> = ({ cabin }) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

  const { isLoading: isDeleting, mutate: onDelete } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("Cabin successfully deleted");
    },
    onError: (err: any) => {
      toast.error(err.message);
    },
  });

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
        <button
          type="button"
          disabled={isDeleting}
          onClick={() => setShowForm((prev) => !prev)}
        >
          Edit
        </button>
        <button
          type="button"
          disabled={isDeleting}
          onClick={() => onDelete(id)}
        >
          Delete
        </button>
      </div>

      {showForm && <CreateCabinForm cabin={cabin}/>}
    </div>
  );
};

export default CabinRow;
