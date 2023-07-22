import React from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { Cabin } from "@prisma/client";

import FormRow from "@/components/FormRow";
import Input from "@/components/Input";
import Button from "@/components/Button";
import SpinnerMini from "@/components/Loader";

import { useCreateOrEditCabin } from "./hooks/useCreateOrEditCabin";

interface CreateCabinFormProps {
  cabin?: Cabin;
  onCloseModal?: () => void;
}

const CreateCabinForm: React.FC<CreateCabinFormProps> = ({
  cabin,
  onCloseModal,
}) => {
  const isEditSession = Boolean(cabin?.id);
  const { isWorking, createOrEditCabin } = useCreateOrEditCabin(isEditSession);
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      name: cabin?.name || "",
      maxCapacity: cabin?.maxCapacity || null,
      regularPrice: cabin?.regularPrice || null,
      discount: cabin?.discount || null,
      description: cabin?.description || "",
      image: cabin?.image || "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const { description, discount, image, maxCapacity, name, regularPrice } =
      data;

    createOrEditCabin(
      {
        id: cabin?.id,
        description,
        discount,
        image: typeof image === "string" ? image : image[0],
        maxCapacity,
        name,
        regularPrice,
      },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      }
    );
  };

  const onError = (err: any) => {
    console.log(err);
  };

  return (
    <form
      className="w-[800px] text-[14px]"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <FormRow label="Cabin name" error={errors?.name?.message} id="name">
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow
        label="Maximum capacity"
        error={errors?.maxCapacity?.message}
        id="maxCapacity"
      >
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Regular price"
        error={errors?.regularPrice?.message}
        id="regularPrice"
      >
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Price should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message} id="discount">
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              (value || 0) <= (getValues().regularPrice || 0) ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
        id="description"
      >
        <textarea
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register("description", {
            required: "This field is required",
          })}
          className="textarea outline-violet-700"
        />
      </FormRow>

      <FormRow label="Cabin photo" id="image" error={errors?.image?.message}>
        <input
          id="image"
          type="file"
          accept="image/*"
          className="text-[14px]  image-input outline-violet-700 dark:text-gray-300"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow hasButton>
        <Button
          variant="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking} type="submit" className="flex items-center gap-2">
        {isWorking && <SpinnerMini />}
          <span>{isEditSession ? "Edit cabin" : "Create new cabin"}</span>
        </Button>
      </FormRow>
    </form>
  );
};

export default CreateCabinForm;
