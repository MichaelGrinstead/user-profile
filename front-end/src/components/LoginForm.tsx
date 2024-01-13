"use client";
import { FormProvider, useForm } from "react-hook-form";
import { LoginData } from "../types";
import { LoginDataSchema } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "./ui/Input";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ReturnHome from "./ReturnHome";

const defaultLoginData: LoginData = {
  username: "",
  password: "",
};

export default function LoginForm() {
  const router = useRouter();

  const formMethods = useForm<LoginData>({
    defaultValues: defaultLoginData,
    resolver: zodResolver(LoginDataSchema),
  });

  const { register, getValues, watch } = formMethods;

  const loginUser = async (e: any) => {
    e.preventDefault();
    const loginData = getValues();

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        console.log(response.statusText);
        return;
      }

      const data = await response.json();
      console.log(data);
    } catch (e) {
      console.log(e);
    }
    router.push("/profile");
  };

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={loginUser}
        className="h-full flex flex-col items-center mt-56 gap-4"
      >
        <h1 className="text-2xl">Login</h1>
        <div className="flex flex-col gap-2">
          <label>Username</label>
          <Input {...register("username")}></Input>
          <label>Password</label>
          <Input {...register("password")} type="password"></Input>
        </div>
        <button
          className="w-24 h-8 border border-white rounded-md"
          type="submit"
        >
          Login
        </button>
        <ReturnHome />
      </form>
    </FormProvider>
  );
}
