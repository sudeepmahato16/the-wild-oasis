import React from "react";
import Logo from "@/components/Logo";
import LoginForm from "@/features/authentication/LoginForm";

const Login = () => {
  return (
    <main className="min-h-screen grid bg-gray-50 dark:bg-gray-900 grid-cols-[420px] content-center justify-center gap-8 ">
      <Logo width={124} height={89}/>
      <h4 className="text-[24px] font-semibold text-center leading-[1.4] dark:text-gray-100">
        Log in to your account
      </h4>
      <LoginForm />
    </main>
  );
};

export default Login;
