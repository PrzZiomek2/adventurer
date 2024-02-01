"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";

import { SlMenu } from "react-icons/sl";
import { AiOutlineClose } from "react-icons/ai";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Arrow from "@/components/ui/Arrow";

export const MainMenu: React.FC = () => {
   const [isMenuOpen, setMenuOpen] = useState(false);
   const [propositionsOpen, setPropositionsOpen] = useState(true);
   const session = useSession();
   const user = session.data?.user;
   const userName = user?.name;

   const toggleMenu = () => {
      setMenuOpen(!isMenuOpen);
   };

   const closeMenu = () => {
      setMenuOpen(false);
   };

   return (
      <div className="relative flex max-w-screen-2xl overflow-hidden">
         <Button
            variant="icon"
            onClick={toggleMenu}
         >
            <SlMenu
               title="Menu"
               className="text-xl"
            />
         </Button>
         {isMenuOpen && (
            <div
               className="fixed z-10 inset-0 bg-black bg-opacity-40"
               onClick={closeMenu}
               role="presentation"
            />
         )}
         <div
            className={`
              fixed z-20 p-4 inset-y-0 left-0 
              transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} 
              bg-dark text-white w-64 
              transition-transform ease-in-out duration-300`}
         >
            <div className="flex gap-5 items-center mb-4">
               <Button
                  variant="icon"
                  title="zamknij menu"
                  onClick={closeMenu}
               >
                  <AiOutlineClose className="text-lg" />
               </Button>
               <Heading
                  variant="h3"
                  data-cy="main-menu-title"
                  className="text-xl font-medium text-white tracking-wide"
               >
                  Witaj {userName ? `, ${userName}` : ""}
               </Heading>
            </div>
            <ul className="mt-6 font-normal">
               <li className="mb-4">
                  <Link href="/about-project">O projekcie</Link>
               </li>
               <li className="mb-4 -m-[5px]">
                  <Button
                     onClick={() => setPropositionsOpen(!propositionsOpen)}
                     variant="custom"
                     className="m-0 p-0 flex gap-1 items-center"
                  >
                     {" "}
                     <Arrow isUp={propositionsOpen} />
                     <span>Propozycje</span>
                  </Button>
                  {propositionsOpen && (
                     <ul className="mt-4 ml-7 font-normal">
                        <li className="mb-4">
                           <Link href="/propositions">Popularne</Link>
                        </li>
                        <li className="mb-4">
                           <Link href={`/propositions/${user?.id}`}>
                              Dla Ciebie
                           </Link>
                        </li>
                     </ul>
                  )}
               </li>
               <li className="mb-4">
                  <Link href="/contact">Kontakt</Link>
               </li>
            </ul>
         </div>
      </div>
   );
};
