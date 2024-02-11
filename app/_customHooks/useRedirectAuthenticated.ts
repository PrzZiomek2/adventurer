import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useRedirectAuthenticated = (path = "/") => {
   const router = useRouter();
   const session = useSession();

   useEffect(() => {
      if (session.status === "authenticated") {
         router.push(path);
      }
   }, [session, router, path]);
};
