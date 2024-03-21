import { useEffect } from "react";

export const useClickOutside = <T>(
   refEl: (T & HTMLElement) | null,
   cb: () => void,
): void => {
   const handleClickOutside = (e: MouseEvent) => {
      if (refEl && !refEl.contains(e.target as Node)) {
         cb();
      }
   };

   useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, [refEl]);
};
