'use client'
import React, { FC } from "react";
import type { Session } from "next-auth";
import { SubmitHandler, useForm, FieldValues } from "react-hook-form";

import FormRow from "@/components/FormRow";
import Input from "@/components/Input";
import Button from "@/components/Button";

interface UpdateUserDataFormProps {
  session: Session | null;
}

const UpdateUserDataForm: FC<UpdateUserDataFormProps> = ({ session }) => {
  const { email = "", name = "", image = "" } = session?.user || {};
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name,
      image,
      email,
    },
  });

  const onSubmit:SubmitHandler<FieldValues> = (data) => {};
  return (
    <form
      className="py-6 px-10 bg-white border border-gray-100 rounded-md text-[14px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormRow label="Email address" id="email">
        <Input id="email" disabled {...register('email')}/>
      </FormRow>

      <FormRow label="Full name" id="name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Avatar image" id="image" error={errors?.image?.message}>
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

      <FormRow hasButton className="mt-4">
        <Button
          type="reset"
          variant="secondary"
        >
          Cancel
        </Button>
        <Button >Update account</Button>
      </FormRow>
    </form>
  );
};

export default UpdateUserDataForm;
