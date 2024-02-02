import React from "react";
import Link from "next/link";

import { MainMenu } from "@/components/common/Header/parts/MainMenu";
import { UserMenu } from "./parts/UserMenu";
import { Heading } from "@/components/ui/Heading";
import { Container } from "@/components/ui/Container";

const Header: React.FC = () => {
   return (
      <header className="bg-dark text-white flex justify-between items-center">
         <Container>
            <div className="flex justify-between items-center px-4 md:px-2 py-4">
               <MainMenu />
               <Heading
                  variant="h1"
                  className="text-2xl text-white lg:text-3xl desktop:order-1"
               >
                  <Link
                     className="hover:no-underline"
                     href="/"
                  >
                     Adventurer
                  </Link>
               </Heading>
               <UserMenu />
            </div>
         </Container>
      </header>
   );
};

export default Header;
