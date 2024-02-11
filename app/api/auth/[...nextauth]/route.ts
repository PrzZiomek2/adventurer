import NextAuth from "next-auth/next";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { postServerData } from "app/_utils/handlersApi";
import { Session, User } from "next-auth";

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
               const res = await postServerData<
                  { user: User } & NextResponseBasic
               >("login", {
                  email: credentials.email,
                  password: credentials.password,
               });

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
      async jwt({ user, token }: { user: User; token: JWT }) {
         const res = { ...token };
         if (user) {
            res.user = user;
         }
         return res;
      },
      async session({ session, token }: { session: Session; token: JWT }) {
         const { user, ...tokenOnly } = token;
         session.token = tokenOnly;
         session.user = user as User;
         return session;
      },
      async signIn({ user }: { user: User }) {
         if (user) {
            return true;
         } else {
            return false;
         }
      },
   },
   pages: {
      signIn: "/login",
   },
   secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authSetup);

export { handler as GET, handler as POST };
