"use client";
import React, { FC } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { SubmitHandler, useForm, FieldValues } from "react-hook-form";
import type { Session } from "next-auth";

import FormRow from "@/components/FormRow";
import Input from "@/components/Input";
import Button from "@/components/Button";
import {SpinnerMini} from "@/components/Loader";

import { useUpdateUser } from "./hooks/useUpdateUser";

interface UpdateUserDataFormProps {
  session: Session | null;
}

const UpdateUserDataForm: FC<UpdateUserDataFormProps> = ({ session }) => {
  const { email = "", name = "", image = "" } = session?.user || {};
  const { update } = useSession();
  const router = useRouter();

  const { updateUser, isUpdating } = useUpdateUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name,
      image: image ?? "",
      email,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const { image, name } = data;

    updateUser(
      {
        name,
        image: typeof image !== "string" ? image[0] : image,
      },
      {
        onSuccess: async (data) => {
          await update({
            user: {
              ...data,
            },
          });
          router.refresh();
        },
      }
    );
  };

  return (
    <form
      className="py-6 px-10 bg-white dark:bg-black border border-gray-100 dark:border-gray-800 rounded-md text-[14px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormRow label="Email address" id="email">
        <Input id="email" disabled {...register("email")} />
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
          className="text-[14px] dark:text-gray-300 image-input outline-violet-700"
          {...register("image")}
        />
      </FormRow>

      <FormRow hasButton className="mt-4">
        <Button type="reset" disabled={isUpdating} variant="secondary" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isUpdating} className="flex gap-2 ">
          {isUpdating && <SpinnerMini />}
          <span> Update account</span>
        </Button>
      </FormRow>
    </form>
  );
};

export default UpdateUserDataForm;
