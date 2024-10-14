import { NextRequest, NextResponse } from "next/server";

import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
   let response = intlMiddleware(request);

   const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
   const cspHeader = `
      default-src 'self';
      style-src 'self' 'unsafe-inline';
      script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https: 'unsafe-eval' blob:;
      img-src 'self' https://*.googleapis.com https://*.gstatic.com *.google.com *.googleusercontent.com data:;
      frame-src *.google.com;
      connect-src 'self' https://*.googleapis.com *.google.com https://*.gstatic.com data: blob:;
      worker-src blob:;
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      font-src 'self' 'nonce-${nonce}' https://fonts.googleapis.com;
      frame-ancestors 'none';
      block-all-mixed-content;
      upgrade-insecure-requests;
 `;

   const contentSecurityPolicyHeaderValue = cspHeader
      .replace(/\s{2,}/g, " ")
      .trim();

   const requestHeaders = new Headers(request.headers);
   requestHeaders.set("x-nonce", nonce);

   requestHeaders.set(
      "Content-Security-Policy",
      contentSecurityPolicyHeaderValue,
   );

   if (!response) {
      response = NextResponse.next({ request: { headers: requestHeaders } });
   }

   response.headers.set(
      "Content-Security-Policy",
      contentSecurityPolicyHeaderValue,
   );

   return response;
}

export const config = {
   matcher: ["/", "/(pl|en)/:path*"],
};
