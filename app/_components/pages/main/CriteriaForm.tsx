"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { InputTags } from "@/components/common/inputTags/InputTags";
import { useUrlParams } from "app/_customHooks/useUrlParams";
import Button from "@/components/ui/Button";
import { Form } from "@/components/ui/Form";
import { Heading } from "@/components/ui/Heading";
import { useSession } from "next-auth/react";
import { Tooltip } from "@/components/ui/Tooltip";

interface CriteriaFormFields {
   disliked: string[];
   favourite: string[];
   tags: string[];
}

const CriteriaForm = () => {
   const router = useRouter();
   const session = useSession();
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

   const handleInputChange = (key: string, v: string[] | boolean) => {
      setFormData((prev) => ({
         ...prev,
         [key]: v,
      }));
   };

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
               Twoje preferencje
            </Heading>
            <InputTags
               id="favourite"
               label="Ulubione miejsca"
               placeholder="np. Meksyk"
               setTags={(read) => handleInputChange("favourite", read)}
               tags={formData.favourite}
            />

            <InputTags
               id="disliked"
               label="Nielubiane miejsca"
               placeholder="np. Rosja"
               setTags={(dis) => handleInputChange("disliked", dis)}
               tags={formData.disliked}
            />

            <InputTags
               id="tags"
               label="Tagi"
               placeholder="np. zabytki, nigtlife, tanio, rodzinnie, city break"
               setTags={(tags) => handleInputChange("tags", tags)}
               tags={formData.tags}
            />
            <Tooltip
               id="search-by-pref-btn"
               text="Wyszukiwanie według preferencji dostępne po zalogowaniu"
               wrapperClassName="mt-6 sm:max-w-max"
            >
               <Button
                  type="submit"
                  className="mt-0"
                  variant="primary"
                  disabled={!userId}
               >
                  Start
               </Button>
            </Tooltip>
         </Form>
      </>
   );
};

export default CriteriaForm;
