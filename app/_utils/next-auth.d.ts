import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
   /**
    * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
    */
   interface Session {
      user: User;
      token: JWT;
   }

   interface User {
      id: string;
      name: string;
      email: string;
      createdAt: string;
      tokens: number;
   }
}
