import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// TODO: configure middleware callbacks

// const allowedOrigins = process.env.NODE_ENV === "production" ? [] : [urls().rootPath];

// export default withAuth(function middleware(req) {}, {
//    callbacks: {
//       authorized: ({ req, token }) => {
//          if (
//             req.nextUrl.pathname.startsWith("/destinations") &&
//             token === null
//          ) {
//             return false;
//          };
//          return true;
//       },
//    },
// });

export { default } from "next-auth/middleware";

export const config = { matcher: ["/destinations"] };
