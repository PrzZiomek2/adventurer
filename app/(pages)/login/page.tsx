"use client";
import React, { useReducer, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LoginForm } from "@/components/pages/login/LoginForm";
import Link from "next/link";
import Toast from "@/components/common/Toast/Toast";
import { useToastReducer } from "app/customHook.ts/useToastReducer";

type FormValues = {
   email: string;
   password: string;
};

export default function SignIn() {
   const router = useRouter();
   const [toastState, dispatchState] = useToastReducer();

   const schema = yup.object().shape({
      email: yup
         .string()
         .email("Nieprawidłowa forma adresu email")
         .required("Pole email nie może być puste"),
      password: yup
         .string()
         .min(2, "Hasło musi mieć co najmniej 6 znaków")
         .required("Pole hasło nie może byc puste"),
   });

   const {
      control,
      handleSubmit,
      formState: { errors, isSubmitting },
      reset,
      setValue,
   } = useForm({
      resolver: yupResolver(schema),
   });

   const onSubmit = async (data: FormValues) => {
      try {
         const res = await signIn("credentials", {
            redirect: false,
            email: data.email,
            password: data.password,
         });

         if (!res?.ok) {
            setValue("password", "");
            dispatchState({
               type: "OPEN_TOAST",
               message: "Nieprawidłowy email lub hasło",
            });
            return;
         }

         reset();
         router.push("/");
      } catch (err) {
         dispatchState({
            type: "OPEN_TOAST",
            message: "Bład serwera",
         });
      }
   };

   const onSubmitHandler = handleSubmit((data: LoginFormValues) => {
      onSubmit(data);
   });

   return (
      <div>
         <h2>Zaloguj się</h2>
         <Toast
            message={toastState.message}
            open={toastState.open}
            setOpen={() => dispatchState({ type: "CLOSE_TOAST" })}
         />
         <LoginForm
            onSubmitHandler={onSubmitHandler}
            control={control}
            errors={errors}
            isSubmitting={isSubmitting}
         />
         <p className="mt-3 mb-0 text-xs font-bold">
            Nie masz jeszcze konta?{" "}
            <Link href="/register">Zarejestruj się</Link>
         </p>
      </div>
   );
}
