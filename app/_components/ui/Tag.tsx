import React from "react";
import Button from "./Button";
import { RiCloseFill } from "react-icons/ri";

interface TagProps {
   data: string;
   handleDelete?: (value: string) => void;
   small?: boolean;
}

export const Tag = ({ data, handleDelete, small }: TagProps) => (
   <div
      className={`
         ${small ? "text-xs" : "text-sm"} 
         bg-transparent flex items-center p-[0.4rem] mt-3 mr-2 pl-4 
         rounded-full text-dim border-[2.5px] border-dark 
      `}
      data-cy="tag"
   >
      <span className={`text-[13px] font-[700] tracking-wider mr-2`}>
         {data}
      </span>
      {handleDelete && (
         <Button
            variant="icon"
            title="Usuń tag"
            onClick={() => {
               handleDelete(data);
            }}
         >
            <RiCloseFill
               title="usuń tag"
               className="scale-125"
            />
         </Button>
      )}
   </div>
);
