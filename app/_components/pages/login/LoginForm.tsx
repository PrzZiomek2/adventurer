import React from "react";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Label } from "@/components/ui/Label";
import { Form } from "@/components/ui/Form";
import { Heading } from "@/components/ui/Heading";
import Link from "next/link";

interface LoginFormProps {
   onSubmitHandler: (
      e?: React.BaseSyntheticEvent<object> | undefined,
   ) => Promise<void>;
   control: Control<LoginFormValues>;
   errors: FieldErrors<LoginFormValues>;
   isSubmitting: boolean;
}

export const LoginForm = ({
   control,
   errors,
   isSubmitting,
   onSubmitHandler,
}: LoginFormProps) => {
   return (
      <Form
         onSubmit={onSubmitHandler}
         className={`
            mt-0 absolute sm:left-1/2 h-full sm:h-auto sm:-translate-x-1/2
            sm:max-w-[480px]
         `}
      >
         <Heading
            className="text-xl text-center mb-4"
            variant="h2"
         >
            Zaloguj się
         </Heading>
         <div className="mb-7 relative">
            <Label htmlFor="email">Login</Label>
            <Controller
               name="email"
               control={control}
               defaultValue=""
               render={({ field, fieldState }) => (
                  <Input
                     {...field}
                     type="email"
                     id="email"
                     placeholder="twoj.email@pl"
                     error={Boolean(fieldState.error)}
                  />
               )}
            />
            {errors.email && (
               <p className="input-error">{errors.email.message}</p>
            )}
         </div>
         <div className="mb-7 relative">
            <Label htmlFor="password">Hasło</Label>
            <Controller
               name="password"
               control={control}
               defaultValue=""
               render={({ field, fieldState }) => (
                  <Input
                     {...field}
                     type="password"
                     id="password"
                     placeholder="hasło"
                     error={Boolean(fieldState.error)}
                  />
               )}
            />
            {errors.password && (
               <p className="input-error">{errors.password.message}</p>
            )}
         </div>
         <Button
            type="submit"
            variant="primary"
            className="mt-6"
            isSubmitting={isSubmitting}
         >
            Zaloguj się
         </Button>
         <p className="mt-8 mb-0 text-sm max-w-[480px] md:px-0">
            Nie masz jeszcze konta?{" "}
            <Link
               className="link-basic"
               href="/register"
            >
               Zarejestruj się
            </Link>
         </p>
      </Form>
   );
};
