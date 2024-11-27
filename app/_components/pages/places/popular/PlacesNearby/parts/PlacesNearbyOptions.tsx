import { Dispatch, FC, SetStateAction } from "react";
import { Tag } from "@/components/ui/Tag";
import { getTranslatedTag } from "app/_utils/handlers";
import translations from "../../../../../../../public/translations/tags.json";
import { usePathname } from "next/navigation";

interface PlacesNearbyOptionsProps {
   categories: string[];
   setCategories: Dispatch<SetStateAction<string[]>>;
}

export const PlacesNearbyOptions: FC<PlacesNearbyOptionsProps> = ({
   categories,
   setCategories,
}) => {
   const pathname = usePathname();
   const locale = pathname.split("/")[1];
   const isPolishLocale = locale === "pl";
   const categoryKeys: Record<string, string> = {};

   translations.placeCategories.forEach((obj) => {
      const [key, value] = Object.entries(obj)[0];
      categoryKeys[value] = key;
   });

   const handleDelete = (tagValue: string) => {
      const newCategories = categories.filter((val) =>
         isPolishLocale ? val !== categoryKeys[tagValue] : val !== tagValue,
      );

      setCategories(newCategories);
   };

   return (
      <div className="lg:col-start-1 lg:col-end-3 lg:mb-2">
         <div
            className="
            flex gap-1 overflow-x-auto with-scroll pb-2 -mt-2 lg:mt-0 min-h-14
         "
         >
            {categories.map((tag) => {
               const translatedTag = isPolishLocale
                  ? getTranslatedTag(tag, "placeCategories")
                  : tag;
               return (
                  <Tag
                     key={tag}
                     data={translatedTag.replaceAll("_", " ")}
                     handleDelete={() => handleDelete(translatedTag)}
                  />
               );
            })}
         </div>
      </div>
   );
};
