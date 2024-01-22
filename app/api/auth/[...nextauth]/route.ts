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
         async authorize(credentials) {
            if (!credentials?.email || !credentials?.password) return null;
            try {
               const res = await postServerData("login", {
                  email: credentials.email,
                  password: credentials.password,
               });
               console.log({ resuuu: res });

               if (res.status === 200) {
                  return res.user;
               } else {
                  console.log(res.message);
                  return null;
               }
            } catch (error) {
               console.error(error);
               return null;
            }
         },
      }),
   ],
   callbacks: {
      async jwt({ user, token }) {
         const res = { ...token };
         if (user) {
            res.user = user;
         }
         return res;
      },
      async session({ session, token }) {
         const { user, ...tokenOnly } = token;
         session.token = tokenOnly;
         session.user = user;
         return session;
      },
   },
   pages: {
      signIn: "/login",
   },
   secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authSetup);

export { handler as GET, handler as POST };
