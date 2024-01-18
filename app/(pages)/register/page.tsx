"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { urls } from "app/utils/urls";
import { RegisterForm } from "@/components/pages/register/RegisterForm";
import { postServerData } from "app/utils/handlersApi";

export default function Register() {
   const router = useRouter();

   const schema = yup.object().shape({
      name: yup
         .string()
         .min(3, "Imię musi mieć co najmniej 3 znaki")
         .required("Imię jest wymagane"),
      email: yup
         .string()
         .email("Nieprawidłowy email")
         .required("Email jest wymagany"),
      password: yup
         .string()
         .min(2, "Hasło musi mieć co najmniej 6 znaków")
         .required("Hasło jest wymagane"),
   });

   const {
      control,
      handleSubmit,
      reset,
      formState: { errors, isSubmitting },
   } = useForm({
      resolver: yupResolver(schema),
   });

   const createAccount = async (data: RegisterFormValues) => {
      const res = await postServerData("register", {
         name: data.name,
         email: data.email,
         password: data.password,
      }).catch((err) => console.log(err));

      console.log({ res });

      if (res?.status === 201) {
         reset();
         router.push("/auth/signin");
      }
   };

   const onSubmitHandler = handleSubmit((data: RegisterFormValues) => {
      createAccount(data);
   });

   return (
      <div>
         <h2>Dołącz do nas</h2>
         <RegisterForm
            onSubmitHandler={onSubmitHandler}
            control={control}
            errors={errors}
            isSubmitting={isSubmitting}
         />
      </div>
   );
}
