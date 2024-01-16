"use client";
import React from 'react';

import { signIn } from 'next-auth/react';

import {LoginForm} from '@/components/pages/signin/LoginForm';
type FormValues = {
  email: string;
  password: string;
}

export default function SignIn() {

  const onSubmit = async (data: FormValues) => {
      const res = await signIn("credentials", {
         redirect: true,
         email: data.email,
         password: data.password,
         callbackUrl: "/"
      });
  };

  return (
    <div>
      <LoginForm 
        onSubmit={onSubmit} 
      />     
    </div>
  )
}
