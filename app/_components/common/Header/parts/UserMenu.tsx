"use client";
import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

import { SlLogin } from "react-icons/sl";
import { FaCircleUser } from "react-icons/fa6";
import { Button } from "@/components/ui/Button";
import { AiOutlineClose } from "react-icons/ai";
import { useMatchMedia } from "app/customHook.ts/useMatchMedia";
import { Breakpoint } from "app/types/enums";

export const UserMenu: React.FC = () => {
   const [isMenuOpen, setMenuOpen] = useState(false);
   const session = useSession();
   const isUserLoggedIn = session.status === "authenticated";
   const isDesktop = useMatchMedia(Breakpoint.DESKTOP);

   const toggleMenu = () => {
      setMenuOpen(!isMenuOpen);
   };

   const closeMenu = () => {
      setMenuOpen(false);
   };

   const menuLoggedData = [
      { menuText: "Konto", path: "/account" },
      { menuText: "Wyloguj się", path: "#", handler: () => signOut() },
   ];
   const menuNotLoggedData = [
      { menuText: "Zaloguj się", path: "/login" },
      { menuText: "Załóż konto", path: "/register" },
   ];

   type MenuItem = { menuText: string; path: string; handler?: () => void };
   const menuData: MenuItem[] = isUserLoggedIn
      ? menuLoggedData
      : menuNotLoggedData;

   const menuList = () =>
      menuData.map(({ menuText, path, handler = () => {} }) => (
         <li
            key={menuText}
            className="mb-4 desktop:mb-0"
         >
            <Link
               href={path}
               onClick={handler}
            >
               {menuText}
            </Link>
         </li>
      ));

   const menuContent = () => {
      if (isDesktop) {
         return <ul>{menuList()}</ul>;
      }

      return (
         <>
            {isMenuOpen && (
               <div className="absolute">
                  <div
                     className="fixed inset-0 bg-black opacity-35 z-20"
                     onClick={closeMenu}
                     role="presentation"
                  />
               </div>
            )}
            <div
               className={`
               fixed p-4 inset-y-0 right-0 
               transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"} 
               bg-dark text-white z-20 w-[12rem] 
               transition-transform ease-in-out duration-300`}
            >
               <Button
                  variant="icon"
                  onClick={closeMenu}
                  className="absolute top-4 right-4 w-auto mt-[7px]"
               >
                  <AiOutlineClose
                     title="zamknj menu"
                     className="text-lg"
                  />
               </Button>
               <ul className="font-normal text-xl">
                  {isMenuOpen && menuList()}
               </ul>
            </div>
         </>
      );
   };

   return (
      <div className="flex relative desktop:order-3">
         <Button
            onClick={toggleMenu}
            variant="icon"
            title="login / rejestracja"
         >
            {isUserLoggedIn ? (
               <FaCircleUser className="text-2xl" />
            ) : (
               <SlLogin className="text-2xl" />
            )}
         </Button>
         {menuContent()}
      </div>
   );
};
