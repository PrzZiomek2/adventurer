import React from "react";
import Link from "next/link";

import { MainMenu } from "@/components/common/Header/parts/MainMenu";
import { UserMenu } from "./parts/UserMenu";
import { Heading } from "@/components/ui/Heading";
import { Container } from "@/components/ui/Container";
import { LanguageSwitch } from "./parts/LanguageSwitch";

const Header: React.FC = () => {
   return (
      <header
         className={`
         bg-dark sticky z-10 2md:static top-0 left-0 w-full text-white flex justify-between items-center
      `}
      >
         <Container>
            <div className="flex justify-between items-center px-4 md:px-2 py-3">
               <MainMenu />
               <Heading
                  variant="h1"
                  className="text-lg sm:text-xl md:text-2xl text-white lg:text-3xl desktop:order-1"
               >
                  <Link
                     className="hover:no-underline"
                     href="/"
                  >
                     Adventurer
                  </Link>
               </Heading>
               <LanguageSwitch />
               <UserMenu />
            </div>
         </Container>
      </header>
   );
};

export default Header;
