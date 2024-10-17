"use client";
import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

import { SlLogin } from "react-icons/sl";
import { FaCircleUser } from "react-icons/fa6";
import Button from "@/components/ui/Button";
import { AiOutlineClose } from "react-icons/ai";
import { Heading } from "@/components/ui/Heading";
import { usePathname } from "next/navigation";

export const UserMenu: React.FC = () => {
   const [isMenuOpen, setMenuOpen] = useState(false);
   const session = useSession();
   const pathname = usePathname();
   const isUserLoggedIn = session.status === "authenticated";
   const user = session.data?.user;
   const userName = user?.name;
   const locale = pathname.split("/")[1];

   useEffect(() => {
      setMenuOpen(false);
   }, [pathname]);

   const toggleMenu = () => {
      setMenuOpen(!isMenuOpen);
   };

   const closeMenu = () => {
      setMenuOpen(false);
   };

   const menuLoggedData = [
      { menuText: "Konto", path: `/${locale}/account` },
      { menuText: "Wyloguj się", path: "#", handler: () => signOut() },
   ];
   const menuNotLoggedData = [
      { menuText: "Zaloguj się", path: `/${locale}/login` },
      { menuText: "Załóż konto", path: `/${locale}/register` },
   ];

   type MenuItem = { menuText: string; path: string; handler?: () => void };
   const menuData: MenuItem[] = isUserLoggedIn
      ? menuLoggedData
      : menuNotLoggedData;

   const menuList = () =>
      menuData.map(({ menuText, path, handler = () => {} }) => (
         <li
            key={menuText}
            className="py-2 menu-item-hover"
         >
            <Link
               href={path}
               onClick={handler}
               className="hover:no-underline"
            >
               {menuText}
            </Link>
         </li>
      ));

   const menuContentDesktop = (
      <>
         <ul
            className={`
               hidden desktop:block z-30
               desktop:px-4 text-xl font-normal pb-1 desktop:absolute bg-dark 
               rounded-md top-full right-0 w-[152px] shadow-lg ml-[12px]
               `}
         >
            {isMenuOpen && menuList()}
         </ul>
      </>
   );

   const menuContentMobile = (
      <div
         className={`
            block desktop:hidden 
            fixed p-4 inset-y-0 right-0 z-30
            transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"} 
            bg-dark text-white z-20 w-[220px]
            transition-transform ease-in-out duration-300`}
      >
         <Button
            variant="icon"
            onClick={closeMenu}
            className="absolute top-4 right-4 w-auto mt-[7px] z-30"
         >
            <AiOutlineClose
               title="zamknj menu"
               className="text-lg"
            />
         </Button>
         <ul className="font-normal text-xl -mt-2 ml-[12px]">
            {isMenuOpen && menuList()}
         </ul>
      </div>
   );

   return (
      <div className="flex relative desktop:order-3">
         {userName && (
            <Heading
               variant="h3"
               data-cy="main-menu-title"
               className={`
                  absolute hidden 2md:block right-full w-max text-xl font-medium 
                  text-white tracking-wide mr-3 truncate max-w-60 top-[-3px]
               `}
            >
               Witaj, {userName}
            </Heading>
         )}
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
         {isMenuOpen && (
            <div className="absolute">
               <div
                  className="fixed inset-0 bg-black desktop:bg-transparent desktop:opacity-1 desktop:z-auto opacity-35 z-20"
                  onClick={closeMenu}
                  role="presentation"
               />
            </div>
         )}
         {menuContentDesktop}
         {menuContentMobile}
      </div>
   );
};
