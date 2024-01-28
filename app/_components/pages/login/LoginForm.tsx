import React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Label } from "@/components/ui/Label";
import { Form } from "@/components/ui/Form";
import { Heading } from "@/components/ui/Heading";

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
      <Form onSubmit={onSubmitHandler} maxWidth={480}>
         <Heading
            className="text-xl text-center mb-4"
            variant="h2"
         >
            Zaloguj się
         </Heading>
         <div className="mb-6">
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
         <div className="mb-6">
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
         <Button
            type="submit"
            className="mt-10"
            isSubmitting={isSubmitting}
         >
            Zaloguj się
         </Button>
      </Form>
   );
};
