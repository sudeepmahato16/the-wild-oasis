import React from "react";
import UpdatePasswordForm from "@/features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "@/features/authentication/UpdateUserDataForm";
import { getSession } from "@/services/getSession";

const Accounts = async() => {
  const session = await getSession();
  return (
    <>
      <h1 className="text-[24px] font-semibold text-gray-800">Update your account</h1>

      <div className="flex flex-col gap-4 ">
        <h3 className="text-[20px] font-medium text-gray-800">Update user data</h3>
        <UpdateUserDataForm session={session}/>
      </div>

      <div className="flex flex-col gap-4 mt-4">
        <h3 className="text-[20px] font-medium text-gray-800">Update password</h3>
        <UpdatePasswordForm />
      </div>
    </>
  );
};

export default Accounts;
