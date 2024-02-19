import React from "react";

export const Loader = ({ label }: { label?: string }) => {
   return (
      <div className="grid place-items-center h-auto gap-8">
         {label && <span className="block">{label}</span>}
         <div className="w-[50px] h-[50px] border-8 border-solid border-transparent border-t-dark rounded-full animate-spin"></div>
      </div>
   );
};
