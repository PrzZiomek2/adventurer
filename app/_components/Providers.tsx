"use client";
import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { UserLocationProvider } from "./context/UserLocationProvider";

interface ProvidersProps {
   children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
   return (
      <SessionProvider>
         <UserLocationProvider>{children}</UserLocationProvider>
      </SessionProvider>
   );
}
