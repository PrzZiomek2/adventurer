"use client";

import { usePathname, useRouter } from "next/navigation";

export const LanguageSwitch = () => {
   const pathname = usePathname();
   const router = useRouter();

   const currentLocale = pathname.split("/")[1];

   const switchLocale = (newLocale: string) => {
      const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
      router.push(newPath);
   };

   return (
      <div className="flex absolute right-[40px] sm:right-[70px] md:right-[100px]">
         <button
            className={`bg-transparent border-2 m-0 p-0 px-[5px] h-[25px] text-[0.7rem] hover:brightness-85 rounded-[2px] tracking-widest ${
               currentLocale === "pl" ? "border-white" : "border-transparent"
            }`}
            onClick={() => switchLocale("pl")}
         >
            PL
         </button>
         <button
            className={`bg-transparent border-2 m-0 p-0 px-[5px] h-[25px] text-[0.7rem] hover:brightness-85 rounded-[2px] tracking-widest ${
               currentLocale === "en" ? "border-white" : "border-transparent"
            }`}
            onClick={() => switchLocale("en")}
         >
            EN
         </button>
      </div>
   );
};
