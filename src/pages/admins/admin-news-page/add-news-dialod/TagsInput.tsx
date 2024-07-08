import { Chip, OutlinedInput } from "@mui/material";
import { error } from "console";
import React from "react";

type Props = {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
};

const TagsInput = ({ tags, setTags }: Props) => {
  const [inputValue, setInputValue] = React.useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };
  return (
    <div className="col-span-2 flex flex-col">
      <label
        htmlFor=""
        className="font-normal font-kalnia sm:text-4xl lg:text-lg"
      >
        Mots-cles
      </label>
      <OutlinedInput
        id="tags"
        size="small"
        placeholder="Veuillez renseigner quelques mot-cles relatifs a cet article"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        className="rounded-lg font-playwrite font-light sm:text-4xl lg:text-base placeholder:text-xs placeholder:font-playwrite"
        startAdornment={
          <div className="flex w-auto max-w-full flex-wrap">
            {tags.map((tag, index) => (
              <Chip
                key={index}
                label={<span className="text-xs font-playwrite">{tag}</span>}
                onDelete={() => handleDeleteTag(tag)}
                className="m-1"
              />
            ))}
          </div>
        }
      />
    </div>
  );
};

export default TagsInput;
