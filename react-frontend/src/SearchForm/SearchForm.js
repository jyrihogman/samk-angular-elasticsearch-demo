import React, { useState } from "react";
import { performSearch } from "./SearchService";

export function SearchFormComponent(props) {
  const [searchText, setSearchText] = useState("");

  const handleInput = event => {
    setSearchText(event.target.value);
  };

  function handleSearch() {
    performSearch(searchText)
      .then(res => {
        props.onSearchPerformed(res);
      })
      .catch(error => console.log(error));
  }

  return (
    <div>
      <input onBlur={handleInput} placeholder="Input search text" />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
