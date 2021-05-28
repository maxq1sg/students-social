import React from "react";
import SingleOption from "./SingleOption";
export type SearchOption = {
  label: string;
  value: string;
};
const FilterSelect = ({
  searchTypeFilter,
  setSearchTypeFilter,
}: {
  searchTypeFilter: string;
  setSearchTypeFilter: (arg: string) => void;
}) => {
  const array: SearchOption[] = [
    { label: "Пользователи", value: "users" },
    { label: "Группы", value: "groups" },
  ];
  return (
    <>
      {array.map((item, index) => {
        return (
          <SingleOption
            {...{ searchTypeFilter, setSearchTypeFilter }}
            option={item}
          />
        );
      })}
    </>
  );
};

export default FilterSelect;
