import React from "react";
import Link from "next/link";

import { MainMenu } from "@/components/common/Header/parts/MainMenu";
import { UserMenu } from "./parts/UserMenu";
import { Heading } from "@/components/ui/Heading";

const Header: React.FC = () => {
   return (
      <header className="bg-dark text-white p-4 flex justify-between items-center">
         <MainMenu />
         <Heading
            variant="h1"
            className="text-2xl text-white lg:text-3xl"
         >
            <Link href="/">Adventurer</Link>
         </Heading>
         <UserMenu />
      </header>
   );
};

export default Header;
