"use client";
import Button from "@/components/ui/Button";
import React, { ReactNode, useState, FC, useRef } from "react";

interface TabsProps {
   className?: string;
   items: {
      panel: ReactNode;
      tab: ReactNode;
   }[];
   ariaLabel: string;
}

export const Tabs: FC<TabsProps> = ({ items, ariaLabel }) => {
   const [value, setValue] = useState(0);
   const refs = useRef<Record<string, HTMLElement | null>>({});

   const handleTabClick = (newValue: number) => {
      setValue(newValue);
      refs.current[newValue]?.scrollIntoView({ behavior: "smooth" });
   };

   const tabLabel = (tab: ReactNode, i: number) => (
      <Button
         key={i}
         ref={(el) => (refs.current[i] = el)}
         onClick={() => handleTabClick(i)}
         className={`
            cursor-pointer m-0 py-0 px-4 border-r-3 
            bg-transparent rounded-none first:pl-0 first:border-l-0 last:border-r-0
            ${i === value ? "text-dim text-shadow-1" : "text-emerald-700"}
            ${i === value || i === value - 1 ? "border-emerald-900" : "border-emerald-600"}
         `}
         role="tab"
         id={`tab-${i}`}
         aria-controls={`tabpanel-${i}`}
         aria-selected={value === i}
         variant="custom"
      >
         {tab}
      </Button>
   );

   const tabPanel = (panel: ReactNode, i: number) => (
      <div
         key={i}
         role="tabpanel"
         hidden={value !== i}
         id={`tabpanel-${i}`}
         aria-labelledby={`tab-${i}`}
      >
         {value === i && <div>{panel}</div>}
      </div>
   );

   return (
      <>
         <div
            role="tablist"
            aria-label={ariaLabel}
            className="flex with-scroll py-2 pb-3 mb-3 overflow-x-auto"
         >
            {items.map(({ tab }, i) => tabLabel(tab, i))}
         </div>
         {items.map(({ panel }, i) => tabPanel(panel, i))}
      </>
   );
};

export default Tabs;
