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

  const onDelete = (closeModal?: () => void) =>
    deleteCabin(id, {
      onSettled: () => {
        closeModal?.();
      },
    });

  return (
    <Table.Row>
      <div className="w-[75px] h-[48px] relative">
        <Image
          src={image}
          alt={name}
          fill
          sizes="75px"
          className="scale-[1.2] -translate-x-[12px] "
        />
      </div>

      <h4 className="text-[15px] font-sono text-gray-600 dark:text-gray-300 font-semibold">
        {name}
      </h4>
      <span className="text-gray-500 dark:text-gray-400 text-[12.75px]">
        Fits up to {maxCapacity} guests
      </span>
      <span className="font-sono font-semibold dark:text-gray-300">
        {formatCurrency(regularPrice)}
      </span>
      {discount ? (
        <span className="font-sono font-medium text-green-700 dark:text-green-100">
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
          isLoading={isDeleting}
            disabled={isDeleting}
            onConfirm={onDelete}
            resourceName="cabins"
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
};

export default CabinRow;
