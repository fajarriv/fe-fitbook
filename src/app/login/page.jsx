"use client";

import LoginForm from "@/components/elements/LoginForm";
import React from "react";

const LoginPage = () => {
  return (
    <main className="flex flex-col min-h-screen justify-center items-center bg-cream">
      <h1 className="text-green">Welcome To FitBook</h1>
      <LoginForm />
    </main>
  );
};

export default LoginPage;
