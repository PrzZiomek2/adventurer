"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";

import { SlMenu } from "react-icons/sl";
import { AiOutlineClose } from "react-icons/ai";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Arrow from "@/components/ui/Arrow";
import { useMatchMedia } from "app/customHook.ts/useMatchMedia";
import { Breakpoint } from "app/types/enums";

export const MainMenu: React.FC = () => {
   const [isMenuOpen, setMenuOpen] = useState(false);
   const [propositionsOpen, setPropositionsOpen] = useState(false);
   const session = useSession();
   const user = session.data?.user;
   const isDesktop = useMatchMedia(Breakpoint.DESKTOP);

   const toggleMenu = () => {
      setMenuOpen(!isMenuOpen);
   };

   const closeMenu = () => {
      setMenuOpen(false);
   };

   const menuList = (
      <>
         <li className="mb-4 desktop:mb-0 text-right">
            <Link href="/about-project">O projekcie</Link>
         </li>
         <li className="mb-4 desktop:mb-0 text-right relative">
            <Button
               onClick={() => setPropositionsOpen(!propositionsOpen)}
               variant="custom"
               className="m-0 p-0 flex gap-1 text-xl font-normal items-center"
            >
               <span>Propozycje</span>
               <Arrow isUp={propositionsOpen} />
            </Button>
            {propositionsOpen && (
               <ul className="pt-4 pr-7 text-xl font-normal desktop:w-full desktop:px-4 desktop:absolute bg-dark rounded-md">
                  <li className="mb-4 desktop:text-center">
                     <Link href="/propositions">Popularne</Link>
                  </li>
                  <li className="mb-4 desktop:text-center">
                     <Link href={`/propositions/${user?.id}`}>Dla Ciebie</Link>
                  </li>
               </ul>
            )}
         </li>
         <li className="mb-4 desktop:mb-0 text-right">
            <Link href="/contact">Kontakt</Link>
         </li>
      </>
   );

   return isDesktop ? (
      <ul className="font-normal text-xl flex desktop:order-2 grow gap-6 ml-14">
         {menuList}
      </ul>
   ) : (
      <div className="relative flex max-w-screen-2xl text-xl overflow-hidden desktop:order-2">
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
              fixed z-20 p-4 inset-y-0 left-0 flex flex-col items-end
              transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} 
              bg-dark text-white w-[13rem] 
              transition-transform ease-in-out duration-300`}
         >
            <div className="flex gap-5 self-start items-center mb-4 absolute mt-[7px]">
               <Button
                  variant="icon"
                  title="zamknij menu"
                  onClick={closeMenu}
               >
                  <AiOutlineClose className="text-lg" />
               </Button>
            </div>
            <ul className="font-normal text-xl mr-[6px]">{menuList}</ul>
         </div>
      </div>
   );
};
