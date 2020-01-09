import React, { useState } from "react";
import logo from "./logo.svg";
import { SearchFormComponent } from "./SearchForm/SearchForm";
import "./App.css";
import { SearchResultsComponent } from "./SearchResults/SearchResults";

function App() {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchTextChange = text => {
    if (searchText === text) return;
    setSearchText(text);
  };

  const performSearch = () => {
    console.log(searchText);
    fetch("http://localhost:5000/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query: searchText })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setSearchResults(res);
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <SearchFormComponent
          onSearchTextChange={handleSearchTextChange}
          onPerformSearch={performSearch}
        />
        <SearchResultsComponent documents={searchResults} />
      </header>
    </div>
  );
}

export default App;
