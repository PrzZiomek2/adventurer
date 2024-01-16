import React from 'react';
import { Button } from './Button';

 interface TagProps {
   data: string;
   handleDelete?: (value: string) => void;
   small?: boolean;
 }
 
 export const Tag = ({ data, handleDelete, small }: TagProps) => (
   <div
     className="bg-blue-500 flex items-center p-2 m-2 rounded text-white"
     data-cy="tag"
   >
     <span
       className={`text-${small ? 'sm' : 'base'} font-semibold`}
     >
       {data}
     </span>
     {handleDelete && (
       <Button
         onClick={() => {
           handleDelete(data);
         }}
       >
         &#x2715;
       </Button>
     )}
   </div>
 );