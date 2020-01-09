import React from "react";

export function SearchFormComponent(props) {
  const handleChange = event => {
    props.onSearchTextChange(event.target.value);
  };

  function handleSearch(event) {
    event.preventDefault();
    props.onPerformSearch();
  }

  return (
    <div>
      <input onBlur={handleChange} placeholder="Input search text" />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
