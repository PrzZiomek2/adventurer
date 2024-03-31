import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Tag } from "@/components/ui/Tag";
import { FC, useState } from "react";

interface InputTagsProps {
   tags: string[];
   setTags: (tags: string[]) => void;
   id: string;
   label?: string;
   placeholder: string;
}

export const InputTags: FC<InputTagsProps> = ({
   tags,
   setTags,
   id,
   label,
   placeholder,
}) => {
   const [tagValue, setTagValue] = useState("");

   const handleDelete = (value: string) => {
      const newTags = tags.filter((val) => val !== value);
      setTags(newTags);
   };

   return (
      <div className="flex-grow w-full mb-2">
         <div className="mt-4">
            <Label htmlFor={id}>{label || "Dodawanie tagów"}</Label>
            <Input
               value={tagValue}
               type="text"
               id={id}
               name={id}
               placeholder={placeholder}
               onChange={(e) => setTagValue(e.target.value)}
            />
         </div>
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
         <Button
            type="button"
            variant="tertiary"
            onClick={() => {
               if (!tagValue) return;
               setTags([...tags, tagValue]);
               setTagValue("");
            }}
         >
            Dodaj
         </Button>
      </div>
   );
};
