import NextAuth from "next-auth/next";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { postServerData } from "app/utils/handlersApi";

const authSetup = {
   providers: [
      CredentialsProvider({
         name: "Credentials",
         credentials: {
            email: { label: "Username", type: "text" },
            password: { label: "Password", type: "password" },
         },
         async authorize(credentials, req) {
            if (!credentials?.email || !credentials?.password) return null;
            try {
               const res = await postServerData("signin", {
                  email: credentials.email,
                  password: credentials.password,
               });

               if (res.status === 200) {
                  return res.result;
               } else {
                  return null;
               }
            } catch (error) {
               console.error(error);
               return null;
            }
         },
      }),
   ],
   pages: {
      signIn: "/login",
   },
};

const handler = NextAuth(authSetup);

export { handler as GET, handler as POST };
