"use client";
import React from "react";
import Button from "@/components/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "@/components/Modal";

const AddCabin = () => {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button className="max-w-fit ml-auto">Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
};

export default AddCabin;
