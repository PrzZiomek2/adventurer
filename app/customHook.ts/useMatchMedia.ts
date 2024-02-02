import { useEffect, useState } from "react";

export const useMatchMedia = (breakpoint: number) => {
   const [isQueryMatched, setIsQueryMatched] = useState(false);

   useEffect(() => {
      const queryMatch = window.matchMedia(
         `screen and (min-width: ${breakpoint}px)`,
      );

      setIsQueryMatched(queryMatch.matches);

      const updateMatch = (e: MediaQueryListEvent) =>
         setIsQueryMatched(e.matches);

      queryMatch.addEventListener("change", updateMatch);

      return () => queryMatch.removeEventListener("change", updateMatch);
   }, [breakpoint]);

   return isQueryMatched;
};
