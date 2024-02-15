import React from "react";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Form } from "@/components/ui/Form";
import { Heading } from "@/components/ui/Heading";
import Link from "next/link";

interface RegisterFormProps {
   onSubmitHandler: (
      e?: React.BaseSyntheticEvent<object> | undefined,
   ) => Promise<void>;
   control: Control<RegisterFormValues>;
   errors: FieldErrors<RegisterFormValues>;
   isSubmitting: boolean;
}

export const RegisterForm = ({
   control,
   errors,
   isSubmitting,
   onSubmitHandler,
}: RegisterFormProps) => {
   return (
      <Form
         onSubmit={onSubmitHandler}
         maxWidth={480}
         className="mt-0 absolute sm:top-1/2 sm:left-1/2 h-full sm:h-auto sm:-translate-y-1/2 sm:-translate-x-1/2"
      >
         <Heading
            className="text-xl text-center mb-4"
            variant="h2"
         >
            Dołącz do nas
         </Heading>
         <div className="mb-7">
            <Label htmlFor="name">Imię</Label>
            <Controller
               name="name"
               control={control}
               defaultValue=""
               render={({ field, fieldState }) => (
                  <Input
                     {...field}
                     type="text"
                     placeholder="twoje imię"
                     error={Boolean(fieldState.error)}
                     id="name"
                  />
               )}
            />
            {errors.name && (
               <p className="input-error">{errors.name.message}</p>
            )}
         </div>
         <div className="mb-7">
            <Label htmlFor="email">Email</Label>
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
         <div className="mb-7">
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
            Zapisz
         </Button>
         <p className="mt-8 mb-0 text-sm max-w-[480px] px-4 md:px-0">
            Jeśli posiadasz już konto{" "}
            <Link
               className="link-basic"
               href="/login"
            >
               Zaloguj się
            </Link>
         </p>
      </Form>
   );
};
