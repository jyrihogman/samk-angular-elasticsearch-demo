import React, { useState } from "react";
import { SearchFormComponent } from "./SearchForm/SearchForm";
import "./App.css";
import { SearchResultsComponent } from "./SearchResults/SearchResults";

function App() {
  const [searchResults, setSearchResults] = useState(null);

  const handleResults = results => {
    setSearchResults(results);
  };

  return (
    <div className="App">
      <header className="App-header">
        <SearchFormComponent onSearchPerformed={handleResults} />
        {searchResults && <SearchResultsComponent documents={searchResults} />}
      </header>
    </div>
  );
}

export default App;
