"use client";
import React, { useState } from "react";
import { SlMenu } from "react-icons/sl";
import { AiOutlineClose } from "react-icons/ai";

export const MainMenu: React.FC = () => {
   const [isMenuOpen, setMenuOpen] = useState(false);

   const toggleMenu = () => {
      setMenuOpen(!isMenuOpen);
   };

   const closeMenu = () => {
      setMenuOpen(false);
   };

   return (
      <div className="relative">
         <div className="cursor-pointer" onClick={toggleMenu}>
            <SlMenu className="text-xl" />
         </div>
         {isMenuOpen && (
            <div
               className="fixed inset-0 bg-black bg-opacity-50"
               onClick={closeMenu}
               role="presentation"
            />
         )}
         <div
            className={`
              fixed p-4 inset-y-0 left-0 
              transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} 
              bg-emerald-600 text-white w-64 
              transition-transform ease-in-out duration-300`}
         >
            <div className="flex justify-between items-center mb-4">
               <AiOutlineClose className="text-xl" onClick={closeMenu} />
               <h2 className="text-2xl font-bold">Menu</h2>
            </div>
            <ul>
               <li className="mb-2">Oferta</li>
            </ul>
         </div>
      </div>
   );
};
