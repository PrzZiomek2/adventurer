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
      <div className="fixed bottom-0 right-0 mb-4 mr-4 p-4 bg-red-500 text-white rounded-md shadow-md">
         <div className="flex items-center justify-between">
            <div className="flex items-center">
               <BsExclamationCircle className="mr-2" />
               <span>{message}</span>
            </div>
            <Button onClick={handleClose} variant="icon" className="">
               <IoClose />
            </Button>
         </div>
      </div>
   ) : null;
};

export default Toast;
