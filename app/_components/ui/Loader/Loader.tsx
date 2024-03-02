import React from "react";

export const Loader = ({ label }: { label?: string }) => {
   return (
      <div className="flex flex-col justify-center items-center gap-8 h-full">
         {label && <span className="block">{label}</span>}
         <div
            className={`
               w-[50px] h-[50px] border-8 border-solid border-transparent 
               border-t-dark rounded-full animate-spin justify-center
            `}
         ></div>
      </div>
   );
};
