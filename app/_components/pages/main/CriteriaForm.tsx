"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { InputTags } from "@/components/common/inputTags/InputTags";
import { useUrlParams } from "app/_customHooks/useUrlParams";
import Button from "@/components/ui/Button";
import { Form } from "@/components/ui/Form";
import { Heading } from "@/components/ui/Heading";
import { useSession } from "next-auth/react";
import { Tooltip } from "@/components/ui/Tooltip";

interface CriteriaFormFields {
   [key: string]: string[];
   disliked: string[];
   favourite: string[];
   tags: string[];
}

const CriteriaForm = () => {
   const router = useRouter();
   const session = useSession();
   const t = useTranslations("forms.criteria");
   const tTags = useTranslations("forms.criteria.tags");
   const userId = session.data?.user.id;

   const [formData, setFormData] = useState<CriteriaFormFields>({
      disliked: [],
      favourite: [],
      tags: [],
   });

   const { disliked, favourite, tags } = formData;
   const paramsValues = {
      favourite: favourite.join(","),
      disliked: disliked.join(","),
      tags: tags.join(","),
   };
   const currentParams = useUrlParams(paramsValues);

   useEffect(() => {
      if (!currentParams) return;
      window.history.pushState({}, "", `?${currentParams.toString()}`);
   }, [currentParams]);

   const handleFormSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // TO DO: set user id
      if (favourite.length) {
         router.push(`/places/id/?${currentParams.toString()}`);
      }
   };

   const handleInputChange = (key: string, v: string[]) => {
      setFormData((prev) => ({
         ...prev,
         [key]: v,
      }));
   };

   const tagsData = ["favourite", "disliked", "tags"];

   return (
      <>
         <Form
            onSubmit={handleFormSubmit}
            className="mt-0 sm:static max-w-[700px]"
         >
            <Heading
               className="text-xl mb-2"
               variant="h2"
            >
               {t("yourPreferences")}
            </Heading>

            {tagsData.map((name, i) => (
               <InputTags
                  key={name}
                  id={name}
                  label={tTags(`${i + 1}.label`)}
                  placeholder={tTags(`${i + 1}.placeholder`)}
                  setTags={(value) => handleInputChange(name, value)}
                  tags={formData[name]}
               />
            ))}

            <Tooltip
               id="search-by-pref-btn"
               text={t("tooltip")} //"Wyszukiwanie według preferencji dostępne po zalogowaniu"
               wrapperClassName="mt-6 sm:max-w-max"
            >
               <Button
                  type="submit"
                  className="mt-0"
                  variant="primary"
                  disabled={!userId}
               >
                  {t("add")}
               </Button>
            </Tooltip>
         </Form>
      </>
   );
};

export default CriteriaForm;
