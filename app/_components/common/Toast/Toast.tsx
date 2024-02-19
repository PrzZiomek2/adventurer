"use client";
import { Button } from "@/components/ui/Button";
import React, { useEffect, useState, FC } from "react";
import { BsExclamationCircle } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

interface ToastProps {
   message: string;
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
   open: boolean;
}

const Toast: FC<ToastProps> = ({ message, setOpen, open }) => {
   const [close, setClose] = useState(true);

   const handleClose = () => {
      setOpen(false);
      setClose(true);
   };

   useEffect(() => {
      setClose(!open);

      let timerID: ReturnType<typeof setTimeout>;

      if (open) {
         timerID = setTimeout(() => {
            handleClose();
         }, 2000);
      }

      return () => {
         clearTimeout(timerID);
      };
   }, [close, open]);

   return !close && message ? (
      <div
         className={`
         fixed right-1/2 p-4 bg-red-500 top-[20%] text-white rounded-md shadow-md z-50 translate-x-1/2
      `}
      >
         <div className="flex items-center justify-between">
            <div className="flex items-center">
               <BsExclamationCircle className="mr-2" />
               <span>{message}</span>
            </div>
            <Button
               title="Zamknij komunikat"
               onClick={handleClose}
               variant="icon"
               className="pl-1"
            >
               <IoClose />
            </Button>
         </div>
      </div>
   ) : null;
};

export default Toast;
