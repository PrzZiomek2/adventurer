import React from "react";
import Link from "next/link";

import { SlLogin } from "react-icons/sl";
import { MainMenu } from "@/components/common/Header/parts/MainMenu";

const Header: React.FC = () => {
   return (
      <header className="bg-emerald-700 text-white p-4 flex justify-between items-center">
         <MainMenu />
         <h1 className="text-xl tracking-wide">
            <Link href="/">Adventurer</Link>
         </h1>
         <div>
            <Link href="/signin">
               <SlLogin className="text-xl cursor-pointer" />
            </Link>
         </div>
      </header>
   );
};

export default Header;
