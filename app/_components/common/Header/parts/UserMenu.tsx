"use client";
import React from "react";
import { useSession, signOut, signIn } from "next-auth/react";
import Link from "next/link";

import { SlLogin } from "react-icons/sl";
import { FaCircleUser } from "react-icons/fa6";
import { Button } from "@/components/ui/Button";

export const UserMenu: React.FC = () => {
   const session = useSession();
   const isUser = session.status === "authenticated"; // session?.user;

   return (
      <div className="flex relative">
         <Button onClick={() => (isUser ? signOut() : signIn())} variant="icon">
            {isUser ? (
               <FaCircleUser className="text-2xl cursor-pointer" />
            ) : (
               <SlLogin className="text-2xl cursor-pointer" />
            )}
         </Button>
      </div>
   );
};
