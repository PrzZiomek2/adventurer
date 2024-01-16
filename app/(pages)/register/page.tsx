"use client";
import React from 'react'
import { useRouter } from 'next/navigation';
import { SubmitHandler } from "react-hook-form"

import { urls } from 'app/utils/urls';
import { RegisterForm } from '@/components/pages/register/RegisterForm';

const {rootPath} = urls();

export default function Register() {

   const router = useRouter();

   const createAccount = async (data: RegisterFormValues) => { 
      console.log({data});
      return;
      const res = await fetch(`${rootPath}/api/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name, 
          email: data.email,
          password: data.password
        }),
      })
      .catch(err => {
      
      });

      if(!res) return; 

      const resJson = await res.json(); 

      if(resJson?.insertedId){
         router.push("/auth/signin");
      }
   }; 

  return (
   <div>
      <RegisterForm createAccount={createAccount} />
   </div>
  )
}
