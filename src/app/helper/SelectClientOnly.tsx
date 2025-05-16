"use client";

import { useEffect, useState } from "react";
import Select from "react-select";
import type { SingleValue } from "react-select";

type OptionType = {
  label: string;
  value: number | null;
};

type Props = {
  options: OptionType[];
  value: OptionType | null;
  onChange: (option: SingleValue<OptionType>) => void;
  darkMode: boolean;
};

export default function SelectClientOnly({
  options,
  value,
  onChange,
  darkMode, 
}: Props) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      isClearable
      placeholder="All Genres"
      styles={{
        control: base => ({
          ...base,
          backgroundColor: darkMode ? "#27272a" : "#fff",
          borderColor: darkMode ? "#52525b" : "#ccc",
          color: darkMode ? "#fff" : "#000",
        }),
        menu: base => ({
          ...base,
          maxHeight: "200px",
          overflowY: "auto",
          backgroundColor: darkMode ? "#27272a" : "#fff",
        }),
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isFocused
            ? darkMode
              ? "#3f3f46"
              : "#e5e5e5"
            : darkMode
            ? "#27272a"
            : "#fff",
          color: darkMode ? "#fff" : "#000",
        }),
        singleValue: base => ({
          ...base,
          color: darkMode ? "#fff" : "#000",
        }),
      }}
      menuPosition="absolute"
      menuPlacement="auto"
    />
  );
}
