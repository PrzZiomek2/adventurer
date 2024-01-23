import { useReducer } from "react";

type ToastState = {
   open: boolean;
   message: string;
};

type Action = {
   type: "OPEN_TOAST" | "CLOSE_TOAST";
   message?: string;
};

const initialState: ToastState = {
   open: false,
   message: "",
};

const toastReducer = (state: ToastState, action: Action): ToastState => {
   switch (action.type) {
      case "OPEN_TOAST":
         return { open: true, message: action.message || "" };
      case "CLOSE_TOAST":
         return { ...state, open: false };
      default:
         return state;
   }
};

export const useToastReducer = () => useReducer(toastReducer, initialState);
