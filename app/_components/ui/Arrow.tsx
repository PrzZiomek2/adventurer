import React, { FC } from "react";
import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";

interface ArrowProps {
   className?: string;
   isUp?: boolean;
}

const Arrow: FC<ArrowProps> = ({ isUp, className = "" }) => {
   const Icon = isUp ? RiArrowUpSLine : RiArrowDownSLine;

   return (
      <Icon
         title={isUp ? "Strzałka zwiń" : "Strzałka rozwiń"}
         className={`
            p-0 m-0 border-none hover:brightness-85 transition duration-300 text-2xl 
            ${className}
         `}
      />
   );
};

export default Arrow;
