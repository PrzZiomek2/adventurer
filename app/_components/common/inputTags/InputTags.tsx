import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
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
      <div className="flex-grow w-full mb-2">
         <div className="flex flex-wrap">
            {tags.map((data, index) => (
               <Tag
                  data={data}
                  handleDelete={handleDelete}
                  key={index}
                  data-cy="tag-test"
               />
            ))}
         </div>
         <div className="mt-4">
            <Label htmlFor={id}>{label || "Dodawanie tagów"}</Label>
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
            variant="tertiary"
            onClick={() => {
               if (!tagRef.current?.value) return;
               setTags([...tags, tagRef.current!.value]);
               tagRef.current.value = "";
            }}
         >
            Dodaj
         </Button>
      </div>
   );
};
