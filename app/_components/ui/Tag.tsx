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
         bg-emerald-600 flex items-center p-2 mt-3 mr-2 pl-4 pr-3 rounded-full text-white
      `}
      data-cy="tag"
   >
      <span className={`text-sm font-semibold tracking-wider mr-2`}>
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
