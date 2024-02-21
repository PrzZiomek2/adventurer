"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { SlMenu } from "react-icons/sl";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Arrow from "@/components/ui/Arrow";
import { Tooltip } from "@/components/ui/Tooltip";
import { usePathname } from "next/navigation";

export const MainMenu: React.FC = () => {
   const pathname = usePathname();
   const [isMenuOpen, setMenuOpen] = useState(false);
   const [propositionsOpen, setPropositionsOpen] = useState(false);
   const session = useSession();
   const user = session.data?.user;

   useEffect(() => {
      setMenuOpen(false);
   }, [pathname]);

   const toggleMenu = () => {
      setMenuOpen(!isMenuOpen);
   };

   const closeMenu = () => {
      setMenuOpen(false);
   };

   const closePropositions = () => {
      setPropositionsOpen(!propositionsOpen);
   };

   const menuList = (
      <>
         <li className="mb-4 desktop:mb-0 text-right">
            <Link
               className="menu-item-hover"
               href="/about"
            >
               O projekcie
            </Link>
         </li>
         <li className="mb-4 desktop:mb-0 text-right relative">
            <Button
               onClick={() => setPropositionsOpen(!propositionsOpen)}
               variant="custom"
               className={`
                  m-0 p-0 relative group flex gap-1 text-xl font-normal items-center
                  menu-item-hover focus-visible:outline-white mr-[-7px]
               `}
            >
               <span>Propozycje</span>
               <Arrow isUp={propositionsOpen} />
            </Button>
            {propositionsOpen && (
               <ul
                  className="
                     flex flex-col gap-4
                     py-4 pr-7 text-xl font-normal desktop:w-auto desktop:shadow-lg desktop:left-1/2 desktop:-translate-x-1/2 
                     desktop:px-4 desktop:absolute bg-dark rounded-md desktop:top-[110%] z-30
                  "
               >
                  <li>
                     <Link
                        className="menu-item-hover"
                        href="/propositions/popular"
                        onClick={() => setPropositionsOpen(false)}
                     >
                        Popularne
                     </Link>
                  </li>
                  <li>
                     <Tooltip
                        id="propositions-user"
                        text="Dostępne po zalogowaniu"
                     >
                        <Link
                           className={
                              user?.id ? "menu-item-hover" : "disabled-link"
                           }
                           href={`/propositions/${user?.id}`}
                           onClick={() => setPropositionsOpen(false)}
                        >
                           Twoje
                        </Link>
                     </Tooltip>
                  </li>
               </ul>
            )}
         </li>
         <li className="mb-4 desktop:mb-0 text-right">
            <Link
               className="menu-item-hover"
               href="#"
            >
               Relacje
            </Link>
         </li>
         <li className="mb-4 desktop:mb-0 text-right">
            <Link
               className="menu-item-hover"
               href="/contact"
            >
               Kontakt
            </Link>
         </li>
      </>
   );

   const desktopMenu = (
      <>
         {propositionsOpen && (
            <div
               className="hidden desktop:flex fixed inset-0 bg-transparent"
               onClick={closePropositions}
               role="presentation"
            />
         )}
         <ul className="hidden desktop:flex font-normal text-xl desktop:order-2 grow gap-6 ml-14">
            {menuList}
         </ul>
      </>
   );

   const mobileMenu = (
      <div
         className={`
            flex desktop:hidden
            relative max-w-screen-2xl text-xl overflow-hidden desktop:order-2
       `}
      >
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
               flex 
               fixed z-20 p-4 inset-y-0 left-0 flex-col items-end
               transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} 
               bg-dark text-white w-[10rem] 
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

   return (
      <>
         {mobileMenu}
         {desktopMenu}
      </>
   );
};
