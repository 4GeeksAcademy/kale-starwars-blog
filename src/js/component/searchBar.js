import React, { useState } from "react";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://www.swapi.tech/api/people?name=${query}`);
      const data = await res.json();
      setResults(data.result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSearch} className="d-flex mb-3">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Search
        </button>
      </form>
      <ul className="list-group">
        {results.map((result) => (
          <li key={result.uid} className="list-group-item">
            <Link to={`/people/${result.uid}`}>{result.properties.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
