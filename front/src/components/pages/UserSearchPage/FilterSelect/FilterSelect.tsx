import React, { ChangeEvent, SyntheticEvent, useState } from "react";
// import SingleOption from "./SingleOption";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
import "./filter.css";

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
  const [open, setOpen] = useState<boolean>(true);
  const array: SearchOption[] = [
    { label: "Пользователи", value: "users" },
    { label: "Группы", value: "groups" },
  ];
  const changeOpenClickHandler = () => {
    setOpen((prev) => !prev);
  };
  return (
    <div>
      <h3 className="filter-title">
        Фильтр
        {open ? (
          <ArrowDropUpIcon
            fontSize="large"
            className="filter-icon"
            onClick={changeOpenClickHandler}
          />
        ) : (
          <ArrowDropDownIcon
            fontSize="large"
            className="filter-icon"
            onClick={changeOpenClickHandler}
          />
        )}
      </h3>

      <div className={open ? "filter-open__style" : "filter-closed__style"}>
        <RadioGroup
          aria-label="quiz"
          name="quiz"
          value={searchTypeFilter}
          onChange={(e: ChangeEvent) =>
            setSearchTypeFilter((e.target as HTMLInputElement).value)
          }
        >
          {array.map((item, index) => {
            return (
              // <SingleOption
              //   {...{ searchTypeFilter, setSearchTypeFilter }}
              //   option={item}
              // />
              <FormControlLabel
                value={item.value}
                control={<Radio />}
                label={item.label}
              />
            );
          })}
        </RadioGroup>
      </div>
    </div>
  );
};

export default FilterSelect;
