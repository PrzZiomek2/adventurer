import React, { BaseSyntheticEvent } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';


interface LoginFormProps {
   onSubmit: (data: LoginFormValues) => Promise<void | LoginFormValues>;
 }
 

export const LoginForm = () => {
   
  const schema = yup.object().shape({
   email: yup
     .string()
     .email('Email nieprawidłowy')
     .required('Pole email nie może być puste'),
   password: yup
     .string()
     .required('Pole hasło nie może byc puste'),
 });

 const { 
   control, 
   handleSubmit, 
   formState: { errors, isSubmitting } 
 } = useForm({
   resolver: yupResolver(schema),
 });

 const onSubmitHandler = (data: LoginFormValues) => {
   onSubmit(data);
 };

 return (
   <div className='max-w-[600px] mx-auto mt-12'>
    <form onSubmit={handleSubmit(onSubmitHandler)} className="max-w-md mx-auto mt-10">
  <div className="mb-4">
    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
      Login
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
      <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
    )}
  </div>
  <div className="mb-4">
    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
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
      <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
    )}
  </div>
  <Button
    type="submit"
    isSubmitting={isSubmitting}
  >
    Zaloguj się
  </Button>
  <p className="mt-3 mb-0 text-xs font-bold">
    Nie masz jeszcze konta? <Link href="/register" className="text-danger">Zarejestruj się</Link>
  </p>
</form>
   </div>

 );
}