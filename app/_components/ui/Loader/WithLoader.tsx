import { ReactNode } from "react";
import { Loader } from "./Loader";

interface WithLoaderProps {
   children: ReactNode;
   label?: string;
   loading: boolean;
   loaderElement?: ReactNode;
}

export const WithLoader = ({
   children,
   label,
   loading,
   loaderElement,
}: WithLoaderProps) => {
   const loaderContent = loaderElement || <Loader label={label} />;

   return loading ? loaderContent : children;
};
