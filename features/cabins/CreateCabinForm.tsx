import React from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import FormRow from "@/components/FormRow";
import Input from "@/components/Input";
import Button from "@/components/Button";

import { createCabin } from "@/services/apiCabin";

const CreateCabinForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm({
    defaultValues: {
      name: "",
      maxCapacity: 1,
      regularPrice: 1,
      discount: 0,
      description: "",
      image: "",
    },
  });
  const queryClient = useQueryClient();
  const {
    mutate: createNewCabin,
    isLoading: isCreating,
    reset,
  } = useMutation({
    mutationFn: createCabin,
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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const { description, discount, image, maxCapacity, name, regularPrice } =
      data;
    createNewCabin({
      description,
      discount,
      image: image[0],
      maxCapacity,
      name,
      regularPrice,
    });
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
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
          disabled={isCreating}
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
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow hasButton>
        <Button variant="secondary" type="reset" onClick={() => {}}>
          Cancel
        </Button>
        <Button disabled={isCreating} type="submit">
          Create new cabin
        </Button>
      </FormRow>
    </form>
  );
};

export default CreateCabinForm;
