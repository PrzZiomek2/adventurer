"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";

import { SlMenu } from "react-icons/sl";
import { AiOutlineClose } from "react-icons/ai";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";

export const MainMenu: React.FC = () => {
   const [isMenuOpen, setMenuOpen] = useState(false);
   const session = useSession();
   const userName = session.data?.user?.name;

   const toggleMenu = () => {
      setMenuOpen(!isMenuOpen);
   };

   const closeMenu = () => {
      setMenuOpen(false);
   };

   return (
      <div className="relative">
         <Button
            variant="icon"
            onClick={toggleMenu}
         >
            <SlMenu className="text-xl" />
         </Button>
         {isMenuOpen && (
            <div
               className="fixed z-10 inset-0 bg-black bg-opacity-50"
               onClick={closeMenu}
               role="presentation"
            />
         )}
         <div
            className={`
              fixed z-20 p-4 inset-y-0 left-0 
              transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} 
              bg-emerald-700 text-white w-64 
              transition-transform ease-in-out duration-300`}
         >
            <div className="flex justify-between items-center mb-4">
               <Button
                  variant="icon"
                  onClick={closeMenu}
               >
                  <AiOutlineClose className="text-xl" />
               </Button>
               <Heading
                  variant="h2"
                  data-cy="main-menu-title"
                  className="text-2xl font-bold"
               >
                  Witaj, {userName}
               </Heading>
            </div>
            <ul>
               <li className="mb-2">Oferta</li>
            </ul>
         </div>
      </div>
   );
};
