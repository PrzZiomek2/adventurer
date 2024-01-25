"use client";
import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

import { SlLogin } from "react-icons/sl";
import { FaCircleUser } from "react-icons/fa6";
import { Button } from "@/components/ui/Button";
import { AiOutlineClose } from "react-icons/ai";

export const UserMenu: React.FC = () => {
   const [isMenuOpen, setMenuOpen] = useState(false);
   const session = useSession();
   const isUser = session.status === "authenticated";

   const toggleMenu = () => {
      setMenuOpen(!isMenuOpen);
   };

   const closeMenu = () => {
      setMenuOpen(false);
   };

   const menuContent = () => {
      if (isUser) {
         return (
            <>
               <li className="mb-2">
                  <Link href="/account">Konto</Link>
               </li>
               <li
                  className="mb-2"
                  onClick={() => signOut()}
               >
                  <Link href="#">Wyloguj się</Link>
               </li>
            </>
         );
      }

      return (
         <>
            <li className="mb-2">
               <Link href="/login">Zaloguj się</Link>
            </li>
            <li className="mb-2">
               <Link href="/register">Załóż konto</Link>
            </li>
         </>
      );
   };

   return (
      <div className="flex relative">
         <Button
            onClick={toggleMenu}
            variant="icon"
         >
            {isUser ? (
               <FaCircleUser className="text-2xl" />
            ) : (
               <SlLogin className="text-2xl" />
            )}
         </Button>
         {isMenuOpen && (
            <div
               className="fixed inset-0 bg-black bg-opacity-50"
               onClick={closeMenu}
               role="presentation"
            />
         )}
         <div
            className={`
               fixed p-4 inset-y-0 right-0 
               transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"} 
               bg-emerald-700 text-white w-40 
               transition-transform ease-in-out duration-300`}
         >
            <Button
               variant="icon"
               onClick={closeMenu}
               className="absolute top-4 right-4"
            >
               <AiOutlineClose className="text-xl" />
            </Button>
            <ul>{isMenuOpen && menuContent()}</ul>
         </div>
      </div>
   );
};
