import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useUrlParams = (values: { [key: string]: string }) => {
   const [params, setParams] = useState("");
   const searchParams = useSearchParams();

   useEffect(() => {
      const currentParams = new URLSearchParams(
         Array.from(searchParams.entries()),
      );
      Object.entries(values).forEach(([key, value]) => {
         if (value) currentParams.set(key, value);
      });

      setParams(currentParams.toString());
   }, [searchParams, values]);

   return params;
};
