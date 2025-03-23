import Image from "next/image";
import BgImage from "../../../public/background.webp";

export const Background = () => {
   return (
      <Image
         src={BgImage}
         alt="Palm beach background"
         fill
         className={`
            object-cover object-center fixed inset-0 
            opacity-50 z-[-10] hidden sm:block
        `}
         sizes="100vw"
         placeholder="blur"
         priority
      />
   );
};
