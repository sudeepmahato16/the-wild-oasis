"use client";
import React from "react";
import { SubmitHandler, useForm, FieldValues } from "react-hook-form";


import Button from "@/components/Button";
import FormRow from "@/components/FormRow";
import Input from "@/components/Input";

const UpdatePasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit:SubmitHandler<FieldValues> = (data) => {

  };

  return (
    <form
      className="py-6 px-10 bg-white border border-gray-100 rounded-md text-[14px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormRow
        label="New password (min 8 chars)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Confirm password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
        />
      </FormRow>
      <FormRow hasButton className="mt-4">
        <Button onClick={() => reset()} type="reset" variant="secondary">
          Cancel
        </Button>
        <Button >Update password</Button>
      </FormRow>
    </form>
  );
};

export default UpdatePasswordForm;
