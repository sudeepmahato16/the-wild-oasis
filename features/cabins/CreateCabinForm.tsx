import React from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Cabin } from "@prisma/client";
import { toast } from "react-hot-toast";

import FormRow from "@/components/FormRow";
import Input from "@/components/Input";
import Button from "@/components/Button";

import { createEditCabin } from "@/services/apiCabin";

interface CreateCabinFormProps {
  cabin?: Cabin;
}

const CreateCabinForm: React.FC<CreateCabinFormProps> = ({ cabin }) => {
  const isEditSession = Boolean(cabin?.id);
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
      discount: cabin?.discount || 0,
      description: cabin?.description || "",
      image: cabin?.image || "",
    },
  });

  const queryClient = useQueryClient();
  const { mutate: createNewCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created!");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err: any) => {
      toast.error(err.message);
    },
  });

  const { mutate: EditCabin, isLoading: isEditting } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("Cabin successfully updated!");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err: any) => {
      toast.error(err.message);
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const { description, discount, image, maxCapacity, name, regularPrice } =
      data;

    if (!isEditSession) {
      createNewCabin({
        description,
        discount,
        image: image[0],
        maxCapacity,
        name,
        regularPrice,
      });
    } else {
      EditCabin({
        id: cabin?.id,
        description,
        discount,
        image: typeof image === "string" ? image : image[0],
        maxCapacity,
        name,
        regularPrice,
      });
    }
  };

  const onError = (err: any) => {
    console.log(err);
  };

  const isWorking = isCreating || isEditting;

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
          className="text-[14px]  image-input outline-violet-700"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow hasButton>
        <Button variant="secondary" type="reset" onClick={() => {}}>
          Cancel
        </Button>
        <Button disabled={isWorking} type="submit">
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </form>
  );
};

export default CreateCabinForm;
