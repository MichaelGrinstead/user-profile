"use client";
import { FormProvider, useForm } from "react-hook-form";
import { RegistrationData } from "../types";
import { RegistrationDataSchema } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "./ui/Input";
import { useRouter } from "next/navigation";
import ReturnHome from "./ReturnHome";

const defaultRegistrationData: RegistrationData = {
  username: "",
  email: "",
  password: "",
};

export default function RegisterForm() {
  const router = useRouter();

  const formMethods = useForm<RegistrationData>({
    defaultValues: defaultRegistrationData,
    resolver: zodResolver(RegistrationDataSchema),
  });

  const { register, getValues, watch } = formMethods;

  const registerUser = async (e: any) => {
    const registrationData = getValues();
    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      if (!response.ok) {
        console.log(response.statusText);
        return;
      }
    } catch (e) {
      console.log(e);
    }

    router.push("/login");
  };

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={registerUser}
        className="flex flex-col items-center mt-60  gap-4"
      >
        <h1 className="text-2xl">Register</h1>
        <div className="flex flex-col gap-2">
          <label>Username</label>
          <Input {...register("username")}></Input>
          <label>Email</label>
          <Input {...register("email")}></Input>
          <label>Password</label>
          <Input {...register("password")} type="password"></Input>
        </div>
        <button
          className="w-24 h-8 border border-white rounded-md"
          type="submit"
        >
          Register
        </button>
        <ReturnHome />
      </form>
    </FormProvider>
  );
}
