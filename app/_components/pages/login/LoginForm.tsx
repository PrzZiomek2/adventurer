import React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Label } from "@/components/ui/Label";
import { Form } from "@/components/ui/Form";

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
      <div className="max-w-[600px] mx-auto mt-12">
         <Form onSubmit={onSubmitHandler}>
            <div className="mb-4">
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
               Zaloguj się
            </Button>
         </Form>
      </div>
   );
};
