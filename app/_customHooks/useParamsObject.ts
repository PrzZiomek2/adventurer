import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useParamsObject = () => {
   const [paramsObj, setParamsObj] = useState<{ [key: string]: string }>({});
   const searchParams = useSearchParams();

   useEffect(() => {
      for (const [key, value] of searchParams.entries()) {
         paramsObj[key] = value;
      }
   }, [searchParams, paramsObj]);

   return paramsObj;
};
