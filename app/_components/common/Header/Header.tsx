import React from "react";
import Link from "next/link";

import { MainMenu } from "@/components/common/Header/parts/MainMenu";
import { UserMenu } from "./parts/UserMenu";

const Header: React.FC = () => {
   return (
      <header className="bg-emerald-700 text-white p-4 flex justify-between items-center">
         <MainMenu />
         <h1 className="text-2xl tracking-wide">
            <Link href="/">Adventurer</Link>
         </h1>
         <UserMenu />
      </header>
   );
};

export default Header;
