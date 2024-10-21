"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

import { Heading } from "@/components/ui/Heading";

export const IntroCard = () => {
   const t = useTranslations("home");
   const pathname = usePathname();
   const locale = pathname.split("/")[1];

   const listItems = [
      {
         key: "list.item1",
         linkHref: `${locale}/world-map`,
         linkText: t("list.item1.link1"),
      },
      {
         key: "list.item2",
         linkHref: `${locale}/popular`,
         linkText: t("list.item2.link2"),
      },
      {
         key: "list.item3",
         linkHref: "",
         linkText: "",
      },
   ];
   return (
      <div className="card w-full w-max-[600px] -mb-[1px]">
         <Heading variant="h3">{t("heading")}</Heading>
         <p className="my-4">{t("paragraph")}</p>
         <ul className="list-none">
            {listItems.map((item, index) => (
               <li
                  key={index}
                  className="mb-4"
               >
                  <span>
                     - {t(`${item.key}.title`)}{" "}
                     {item.linkHref && (
                        <Link
                           className="link-basic"
                           href={item.linkHref}
                        >
                           {item.linkText}
                        </Link>
                     )}
                  </span>
                  <p className="my-2">{t(`${item.key}.description`)}</p>
               </li>
            ))}
         </ul>
      </div>
   );
};
