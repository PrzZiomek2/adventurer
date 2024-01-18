import React from "react";
import { useForm, Controller, Control, FieldErrors } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

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
         <form onSubmit={onSubmitHandler}>
            <div className="mb-4">
               <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
               >
                  Imię
               </label>
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
               <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
               >
                  Email
               </label>
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
               <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
               >
                  Hasło
               </label>
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
         </form>
      </div>
   );
};
