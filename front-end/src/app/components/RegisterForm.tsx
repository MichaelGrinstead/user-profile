"use client";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { RegistrationData } from "../types";
import { RegistrationDataSchema } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";

const defaultRegistrationData: RegistrationData = {
  username: "",
  email: "",
  password: "",
};

export default function RegisterForm() {
  const formMethods = useForm<RegistrationData>({
    defaultValues: defaultRegistrationData,
    resolver: zodResolver(RegistrationDataSchema),
  });

  const { register, getValues } = formMethods;

  const registerUser = async () => {
    const registrationData = getValues();
    const response = fetch("/api/register-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registrationData),
    });

    console.log(response);
  };

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={registerUser}
        className="flex flex-col items-center justify-center mt-32 gap-4"
      >
        <h1 className="text-2xl">Register User</h1>
        <div className="flex flex-col gap-2">
          <label>Username</label>
          <input {...register("username")}></input>
          <label>Email</label>
          <input {...register("email")}></input>
          <label>Password</label>
          <input {...register("password")}></input>
        </div>
        <button className="w-24 h-8 border border-white rounded-md ">
          Register
        </button>
      </form>
    </FormProvider>
  );
}
