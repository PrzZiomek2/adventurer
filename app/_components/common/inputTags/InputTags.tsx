import { Tag } from "@/components/ui/Tag";
import { FC, useRef } from "react";

interface InputTagsProps {
  tags: string[];
  setTags: (tags: string[]) => void;
  id: string;
  label?: string;
}

export const InputTags: FC<InputTagsProps> = ({ tags, setTags, id, label }) => {
  const tagRef = useRef<HTMLInputElement>();

  const handleDelete = (value: string) => {
    const newTags = tags.filter((val) => val !== value);
    setTags(newTags);
  };

  return (
    <div className="flex-grow mt-6">
      <div className="flex flex-wrap">
        {tags.map((data, index) => (
          <Tag
            data={data} 
            handleDelete={handleDelete} 
            key={index} 
          />
        ))}
      </div>
      <div className="mt-6">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label || 'Dodawanie tagów'}
        </label>
        <input
          ref={tagRef}
          type="text"
          id={id}
          name={id}
          className="mt-1 p-2 border rounded-md w-full"
          placeholder="Wpisz tutaj"
        />
      </div>
      <button
        className="mt-4 p-2 text-blue-500 border border-blue-500 rounded cursor-pointer"
        onClick={() => {
          if (!tagRef.current) return;
          setTags([...tags, tagRef.current!.value]);
          tagRef.current.value = "";
        }}
      >
        Dodaj
      </button>
    </div>
  );
};