"use client";
import { Button } from "@/components/ui/Button";
import React, { ReactNode, useState, FC } from "react";

interface TabsProps {
   className?: string;
   items: {
      panel: ReactNode;
      tab: { label: string };
   }[];
   ariaLabel: string;
}

export const Tabs: FC<TabsProps> = ({ items, ariaLabel, className }) => {
   const [value, setValue] = useState(0);

   const handleTabClick = (newValue: number) => {
      setValue(newValue);
   };

   const tabLabel = (text: string, i: number) => (
      <Button
         variant="custom"
         key={i}
         onClick={() => handleTabClick(i)}
         className={`cursor-pointer inline-block px-4 py-2 border-2 border-b-0 mx-[-10px]`}
      >
         {text}
      </Button>
   );

   const tabPanel = (panel: ReactNode, i: number) => (
      <div
         key={i}
         role="tabpanel"
         hidden={value !== i}
         id={`simple-tabpanel-${i}`}
         aria-labelledby={`simple-tab-${i}`}
      >
         {value === i && <div>{panel}</div>}
      </div>
   );

   return (
      <div>
         <div>
            <div
               aria-label={ariaLabel}
               className="flex overflow-hidden"
            >
               {items.map(({ tab }, i) => tabLabel(tab.label, i))}
            </div>
         </div>
         <div>{items.map(({ panel }, i) => tabPanel(panel, i))}</div>
      </div>
   );
};

export default Tabs;
