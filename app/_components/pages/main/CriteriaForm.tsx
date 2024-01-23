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

   const inputWrapClasses = "w-full mb-8";

   return (
      <Form onSubmit={handleFormSubmit}>
         <div className={inputWrapClasses}>
            <InputTags
               id="favourite"
               label="Ulubione miejsca"
               setTags={(read) => handleInputChange("favourite", read)}
               tags={formData.favourite}
            />
         </div>

         <div className={inputWrapClasses}>
            <InputTags
               id="disliked"
               label="Nielubiane miejsca / miejsca w których Ci się nie podobało"
               setTags={(dis) => handleInputChange("disliked", dis)}
               tags={formData.disliked}
            />
         </div>

         <div className={inputWrapClasses}>
            <InputTags
               id="tags"
               label="Tagi / Cechy charakterystyczne (np. zabytki, nigtlife, tanio, rodzinnie, city break)"
               setTags={(tags) => handleInputChange("tags", tags)}
               tags={formData.tags}
            />
         </div>

         <div className={inputWrapClasses}>
            <Label htmlFor="isCreative" className="mb-2">
               Losowo
            </Label>
            <Checkbox
               id="isCreative"
               name="isCreative"
               checked={formData.isCreative}
               onChange={(checked) => handleInputChange("isCreative", checked)}
            />
         </div>

         <div className={inputWrapClasses}>
            <div className="relative">
               {!userId && (
                  <div className="absolute bg-black text-white p-2 rounded">
                     Zaloguj się w celu korzystania
                  </div>
               )}
               <Button type="submit" variant="primary" disabled={!userId}>
                  START
               </Button>
            </div>
         </div>
      </Form>
   );
};

export default CriteriaForm;
