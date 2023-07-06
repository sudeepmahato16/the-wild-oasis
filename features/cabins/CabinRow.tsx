"use client";
import React from "react";
import Image from "next/image";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { Cabin } from "@prisma/client";

import ConfirmDelete from "@/components/ConfirmDelete";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "@/components/Modal";
import Table from "@/components/Table";
import Menu from "@/components/Menu";

import { useDeleteCabin } from "./hooks/useDeleteCabin";
import { useCreateOrEditCabin } from "./hooks/useCreateOrEditCabin";
import { formatCurrency } from "@/utils/helpers";

interface CabinRowProps {
  cabin: Cabin;
}

const CabinRow: React.FC<CabinRowProps> = ({ cabin }) => {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { createOrEditCabin } = useCreateOrEditCabin();
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
    <Table.Row>
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

      <Modal>
        <Menu>
          <Menu.Toggle id={id} />
          <Menu.List id={id}>
            <Menu.Button icon={HiSquare2Stack} onClick={handleDuplicate}>
              Duplicate
            </Menu.Button>

            <Modal.Open opens="edit">
              <Menu.Button icon={HiPencil}>Edit</Menu.Button>
            </Modal.Open>

            <Modal.Open opens="delete">
              <Menu.Button icon={HiTrash}>Delete</Menu.Button>
            </Modal.Open>
          </Menu.List>
        </Menu>

        <Modal.Window name="edit">
          <CreateCabinForm cabin={cabin} />
        </Modal.Window>

        <Modal.Window name="delete">
          <ConfirmDelete
            disabled={isDeleting}
            onConfirm={() => deleteCabin(id)}
            resourceName="cabins"
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
};

export default CabinRow;
