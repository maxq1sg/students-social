import React from "react";
import { SearchOption } from "./FilterSelect";

const SingleOption = ({
  option,
  searchTypeFilter,
  setSearchTypeFilter,
}: {
  option: SearchOption;
  searchTypeFilter: string;
  setSearchTypeFilter: (arg: string) => void;
}) => {
  return (
    <div>
      <label>
        <input
          onChange={(e) => {
            setSearchTypeFilter(e.target.value);
          }}
          checked={searchTypeFilter == option.value}
          value={option.value}
          type="radio"
          name="search-type"
          id=""
        />
        {option.label}
      </label>
    </div>
  );
};

export default SingleOption;
