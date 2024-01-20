import { withAuth } from "next-auth/middleware";
import { urls } from "./utils/urls";

// const allowedOrigins = process.env.NODE_ENV === "production" ? [] : [urls().rootPath];

export default withAuth(function middleware(req) {}, {
   callbacks: {
      authorized: ({ req, token }) => {
         if (
            req.nextUrl.pathname.startsWith("/destinations") &&
            token === null
         ) {
            return false;
         }

         return true;
      },
   },
});
