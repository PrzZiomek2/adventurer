import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Tag } from "@/components/ui/Tag";
import { FC, useRef } from "react";

interface InputTagsProps {
   tags: string[];
   setTags: (tags: string[]) => void;
   id: string;
   label?: string;
}

export const InputTags: FC<InputTagsProps> = ({ tags, setTags, id, label }) => {
   const tagRef = useRef<HTMLInputElement>(null);

   const handleDelete = (value: string) => {
      const newTags = tags.filter((val) => val !== value);
      setTags(newTags);
   };

   return (
      <div className="flex-grow mt-6">
         <div className="flex flex-wrap">
            {tags.map((data, index) => (
               <Tag data={data} handleDelete={handleDelete} key={index} />
            ))}
         </div>
         <div className="mt-6">
            <label
               htmlFor={id}
               className="block text-sm font-medium text-gray-700"
            >
               {label || "Dodawanie tagów"}
            </label>
            <Input
               ref={tagRef}
               type="text"
               id={id}
               name={id}
               placeholder="Wpisz tutaj"
            />
         </div>
         <Button
            type="button"
            onClick={() => {
               if (!tagRef.current) return;
               setTags([...tags, tagRef.current!.value]);
               tagRef.current.value = "";
            }}
         >
            Dodaj
         </Button>
      </div>
   );
};
