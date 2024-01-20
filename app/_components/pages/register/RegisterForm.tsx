import React from "react";
import { useForm, Controller, Control, FieldErrors } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Form } from "@/components/ui/Form";

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
      <div className="max-w-2xl mx-auto mt-10">
         <Form onSubmit={onSubmitHandler}>
            <div className="mb-4">
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
                  <p className="text-xs text-red-500 mt-1">
                     {errors.name.message}
                  </p>
               )}
            </div>
            <div className="mb-4">
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
                  <p className="text-xs text-red-500 mt-1">
                     {errors.email.message}
                  </p>
               )}
            </div>
            <div className="mb-4">
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
                  <p className="text-xs text-red-500 mt-1">
                     {errors.password.message}
                  </p>
               )}
            </div>
            <Button type="submit" isSubmitting={isSubmitting}>
               Zapisz
            </Button>
         </Form>
      </div>
   );
};
