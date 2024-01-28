"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { InputTags } from "@/components/common/inputTags/InputTags";
import { useUrlParams } from "app/customHook.ts/useUrlParams";
import { useParamsObject } from "app/customHook.ts/useParamsObject";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Form } from "@/components/ui/Form";
import { Checkbox } from "@/components/ui/Checkbox";
import { Heading } from "@/components/ui/Heading";
// import useSWR from 'swr';
// import { useSession } from 'next-auth/react';

interface CriteriaFormFields {
   disliked: string[];
   favourite: string[];
   isCreative: boolean;
   tags: string[];
}

const CriteriaForm = () => {
   const userId = 1;
   const router = useRouter();
   const paramsObject = useParamsObject();
   const [formData, setFormData] = useState<CriteriaFormFields>({
      disliked: [],
      favourite: [],
      isCreative: false,
      tags: [],
   });

   const { disliked, favourite, tags, isCreative } = formData;
   const paramsValues = {
      favourite: favourite.join(","),
      disliked: disliked.join(","),
      isCreative: isCreative.toString(),
      tags: tags.join(","),
   };
   const currentParams = useUrlParams(paramsValues);

   useEffect(() => {
      window.history.pushState({}, "", `?${currentParams.toString()}`);
   }, [currentParams]);

   const handleFormSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if (favourite.length) {
         router.push(`/destinations?${currentParams.toString()}`);
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
         <Form onSubmit={handleFormSubmit}>
            <Heading
               className="text-xl text-center mb-2"
               variant="h2"
            >
               Twoje preferencje
            </Heading>
            <InputTags
               id="favourite"
               label="Ulubione miejsca"
               setTags={(read) => handleInputChange("favourite", read)}
               tags={formData.favourite}
            />

            <InputTags
               id="disliked"
               label="Nielubiane miejsca"
               setTags={(dis) => handleInputChange("disliked", dis)}
               tags={formData.disliked}
            />

            <InputTags
               id="tags"
               label="Tagi / Cechy charakterystyczne (np. zabytki, nigtlife, tanio, rodzinnie, city break)"
               setTags={(tags) => handleInputChange("tags", tags)}
               tags={formData.tags}
            />
            <div className="flex gap-3 w-full mt-6">
               <Checkbox
                  id="isCreative"
                  name="isCreative"
                  checked={formData.isCreative}
                  onChange={(checked) =>
                     handleInputChange("isCreative", checked)
                  }
               />
               <Label
                  variant="right"
                  htmlFor="isCreative"
               >
                  Losowo
               </Label>
            </div>
            <div>
               {!userId && (
                  <div className="absolute bg-black text-white p-2 rounded mb-8">
                     Zaloguj się w celu korzystania
                  </div>
               )}
               <Button
                  type="submit"
                  className="mt-12"
                  variant="primary"
                  disabled={!userId}
               >
                  Start
               </Button>
            </div>
         </Form>
      </>
   );
};

export default CriteriaForm;
