"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { InputTags } from '@/components/common/inputTags/InputTags';
import { urls } from 'app/utils/urls';
import { useUrlParams } from 'app/customHook.ts/useUrlParams';
// import useSWR from 'swr';
// import { useSession } from 'next-auth/react';

interface CriteriaFormFields{
  disliked: string[];
  favourite: string[];
  isCreative: boolean,
  tags: string[]; 
}

const CriteriaForm = () => {
  const userId = 1;
  const {rootPath} = urls();
  const router = useRouter();
  const searchParams = useSearchParams(); 

  const [formData, setFormData] = useState<CriteriaFormFields>({
    disliked: [],
    favourite: [],
    isCreative: false,
    tags: []   
 }); 

 const handleFormSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const {disliked, favourite, tags, isCreative} = formData;

  if(disliked.length && favourite.length){
    const params = {
      disliked: disliked.join(","),
      favourite: favourite.join(","),
      isCreative: isCreative.toString(),
      tags: tags.join(","),  
    };
    const currentParams = new URLSearchParams(Array.from(searchParams.entries()));
    
    Object.entries(params).forEach( ([key, value]) => {
      currentParams.set(key, value);
    });
    
    return currentParams.toString();
    
  //  router.push(`/results?${urlWithParams}`);

  }
};


  const handleInputChange = (key: string, v: string[] | boolean) =>{
    setFormData(prev => ({
      ...prev,
      [key]: v
    }))
  }
 
  return (
    <form onSubmit={handleFormSubmit} className="w-full flex flex-col items-center">
      <div className="w-full mb-8">

        <InputTags 
          id="favourite"
          label='Ulubione miejsca'
          setTags={read => handleInputChange("favourite", read)}
          tags={formData.favourite}
        />
      </div>

      <div className="w-full mb-8">

        <InputTags 
          id="disliked"
          label='Nielubiane miejsca / miejsca w których Ci się nie podobało'
          setTags={dis => handleInputChange("disliked", dis)}
          tags={formData.disliked}
        />
      </div>

      <div className="w-full mb-8">

        <InputTags
            id="tags"
            label='Tagi / Cechy charakterystyczne (np. zabytki, nigtlife, tanio, rodzinnie, city break)'
            setTags={tags => handleInputChange("tags", tags)}
            tags={formData.tags}
          />
      </div>

      <div className="w-full mb-8">
        <label htmlFor="isCreative" className="mb-2">
          Losowo
        </label>
        <input
          type="checkbox"
          id="isCreative"
          name="isCreative"
          checked={formData.isCreative}
          onChange={(e) => handleInputChange('isCreative', e.currentTarget.checked)}
        />
      </div>

      <div className="w-full mb-8">
        <div className="relative">
          {!userId && (
            <div className="absolute bg-black text-white p-2 rounded">
              Zaloguj się w celu korzystania
            </div>
          )}
          <button
            type="submit"
            className={`bg-blue-500 text-white py-2 px-4 rounded ${!userId && 'cursor-not-allowed'}`}
            disabled={!userId}
          >
            START
          </button>
        </div>
      </div>
    </form>
  );
};

export default CriteriaForm;
