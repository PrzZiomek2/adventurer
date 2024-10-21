import React from "react";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Form } from "@/components/ui/Form";
import { Heading } from "@/components/ui/Heading";
import Link from "next/link";
import { Tooltip } from "@/components/ui/Tooltip";

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
   const pathname = usePathname();
   const locale = pathname.split("/")[1];
   const t = useTranslations("forms.register");

   return (
      <Form
         onSubmit={onSubmitHandler}
         className={`
            absolute sm:left-1/2 sm:h-auto sm:-translate-x-1/2 h-[630px]
            sm:max-w-[480px] 
         `}
      >
         <Heading
            className="text-xl text-center mb-4"
            variant="h2"
         >
            {t("joinUs")}
         </Heading>
         <div className="mb-7">
            <Label htmlFor="name">{t("name")}</Label>
            <Controller
               name="name"
               control={control}
               defaultValue=""
               render={({ field, fieldState }) => (
                  <Input
                     {...field}
                     type="text"
                     placeholder={t("yourName")}
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
            <Label htmlFor="email">{t("email")}</Label>
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
         <div className="mb-12">
            <Label htmlFor="password">{t("password")}</Label>
            <Controller
               name="password"
               control={control}
               defaultValue=""
               render={({ field, fieldState }) => (
                  <Input
                     {...field}
                     type="password"
                     id="password"
                     placeholder={t("password")}
                     error={Boolean(fieldState.error)}
                  />
               )}
            />
            {errors.password && (
               <p className="input-error">{errors.password.message}</p>
            )}
         </div>
         <Tooltip
            id="register-btn"
            text={t("tooltip")}
         >
            {" "}
            <Button
               type="submit"
               variant="primary"
               className="w-full mt-0"
               isSubmitting={isSubmitting}
               disabled
            >
               {t("save")}
            </Button>
         </Tooltip>
         <p className="mt-8 mb-0 text-sm max-w-[480px] px-4 md:px-0">
            {t("youHaveAccount")}{" "}
            <Link
               className="link-basic"
               href={`/${locale}/login`}
            >
               {t("login")}
            </Link>
         </p>
      </Form>
   );
};
