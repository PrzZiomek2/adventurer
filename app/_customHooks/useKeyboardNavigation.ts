import { KeyboardEvent, useRef, useState } from "react";

export const useKeyboardNavigation = <T>(
   items: T[],
   cb: (itemNumber: number) => void,
) => {
   const [itemNumber, setItemNumber] = useState(-1);
   const listRef = useRef<HTMLUListElement>(null);

   const handleListNavigation = (e: KeyboardEvent<HTMLUListElement>) => {
      e.preventDefault();
      switch (e.key) {
         case "ArrowDown":
            setItemNumber((prev) => Math.min(prev + 1, items.length - 1));
            break;
         case "ArrowUp":
            setItemNumber((prev) => Math.max(prev - 1, 0));
            break;
         case "Enter":
            if (itemNumber >= 0 && itemNumber < items.length) {
               cb(itemNumber);
            }
            break;
         default:
            break;
      }
   };

   return { listRef, itemNumber, handleListNavigation };
};
