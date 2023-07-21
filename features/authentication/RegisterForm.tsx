"use client";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import FormRow from "@/components/FormRow";
import Input from "@/components/Input";
import Button from "@/components/Button";
import {SpinnerMini} from "@/components/Loader";
import { useRegister } from "./hooks/useRegister";

const RegisterForm = () => {
  const { registerUser, isLoading } = useRegister();
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const { email, password, fullName } = data;
    registerUser({ email, password, fullName }, {
      onSuccess: () => reset()
    });
  };

  return (
    <form
      className="text-[14px] py-[24px] px-10 bg-white dark:bg-black border border-gray-100 dark:border-gray-800 rounded-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormRow
        label="Full name"
        error={errors?.fullName?.message}
        id="fullName"
      >
        <Input
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message} id="email">
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
        id="password"
      >
        <Input
          type="password"
          id="password"
          disabled={isLoading}
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
        label="Repeat password"
        error={errors?.passwordConfirm?.message}
        id="passwordConfirm"
      >
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
        />
      </FormRow>

      <FormRow hasButton>
        <Button
          variant="secondary"
          type="reset"
          disabled={isLoading}
          onClick={() => reset()}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading} className="flex gap-2 items-center">
          {isLoading && <SpinnerMini />}
          Create new user
        </Button>
      </FormRow>
    </form>
  );
};

export default RegisterForm;
