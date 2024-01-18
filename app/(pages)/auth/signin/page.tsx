"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { LoginForm } from "@/components/pages/signin/LoginForm";
type FormValues = {
   email: string;
   password: string;
};

export default function SignIn() {
   const schema = yup.object().shape({
      email: yup
         .string()
         .email("Email nieprawidłowy")
         .required("Pole email nie może być puste"),
      password: yup.string().required("Pole hasło nie może byc puste"),
   });

   const {
      control,
      handleSubmit,
      formState: { errors, isSubmitting },
   } = useForm({
      resolver: yupResolver(schema),
   });

   const onSubmitHandler = handleSubmit((data: LoginFormValues) => {
      onSubmit(data);
   });

   const onSubmit = async (data: FormValues) => {
      const res = await signIn("credentials", {
         redirect: true,
         email: data.email,
         password: data.password,
         callbackUrl: "/",
      });
   };

   return (
      <div>
         <h2>Zaloguj się</h2>
         <LoginForm
            onSubmitHandler={onSubmitHandler}
            control={control}
            errors={errors}
            isSubmitting={isSubmitting}
         />
      </div>
   );
}
