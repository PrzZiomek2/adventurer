"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { RegisterForm } from "@/components/pages/register/RegisterForm";
import { postServerData } from "app/utils/handlersApi";
import { useToastReducer } from "app/customHook.ts/useToastReducer";
import Toast from "@/components/common/Toast/Toast";
import { Heading } from "@/components/ui/Heading";
import { useRedirectAuthenticated } from "app/customHook.ts/useRedirectAuthenticated";
import Header from "@/components/common/Header/Header";
import { Container } from "@/components/ui/Container";

export default function Register() {
   const router = useRouter();
   const [toastState, dispatchState] = useToastReducer();

   useRedirectAuthenticated();

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
      try {
         const res = await postServerData("register", {
            name: data.name,
            email: data.email,
            password: data.password,
         });

         if (res?.status === 201) {
            reset();
            router.push("/login");
         }
      } catch (err) {
         console.error(err);
         dispatchState({
            type: "OPEN_TOAST",
            message: "Bład serwera",
         });
      }
   };

   const onSubmitHandler = handleSubmit((data: RegisterFormValues) => {
      createAccount(data);
   });

   return (
      <main>
         <Container>
            <Toast
               message={toastState.message}
               open={toastState.open}
               setOpen={() => dispatchState({ type: "CLOSE_TOAST" })}
            />
            <RegisterForm
               onSubmitHandler={onSubmitHandler}
               control={control}
               errors={errors}
               isSubmitting={isSubmitting}
            />
         </Container>
      </main>
   );
}
