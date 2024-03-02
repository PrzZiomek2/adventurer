import React from "react";
import { Button } from "./Button";
import { SlMenu } from "react-icons/sl";
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
         bg-emerald-600 flex items-center p-[0.4rem] mt-3 mr-2 pl-4 rounded-full text-white
      `}
      data-cy="tag"
   >
      <span className={`text-[13px] font-semibold tracking-wider mr-2`}>
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
