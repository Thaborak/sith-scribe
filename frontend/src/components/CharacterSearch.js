import React, { useState } from "react";
import styled from "styled-components";
import { fetchCharacterByName } from "../services/api";
import SearchResults from "./SearchResults";

const StyledCharacterSearch = styled.div`
  background-color: #0000;
  padding: 1rem;
  border-radius: 8px;
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  margin-top: 1rem;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 2px solid #ffde00;
  border-radius: 4px;
  background-color: white;
  font-size: 1rem;
  font-family: "Roboto", sans-serif;

  &:focus {
    outline: none;
    border-color: #ffde00;
    box-shadow: 0 0 5px #ffde00;
  }
`;

const SearchButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #ffde00;
  color: #000;
  margin-left: 1rem;
  cursor: pointer;
  font-size: 1rem;
  font-family: "Roboto", sans-serif;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ffd000;
  }
`;
export const CharacterSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    if (searchTerm) {
      const results = await fetchCharacterByName(searchTerm);
      setSearchResults(results);
      setLoading(false);
    } else {
      setSearchResults(null);
      setLoading(false);
    }
  };

  return (
    <div>
      <StyledCharacterSearch>
        <SearchWrapper>
          <SearchInput
            type="text"
            placeholder="Search for a Star Wars character Example: Luke Skywalker"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchButton onClick={handleSearch}>Search</SearchButton>
        </SearchWrapper>
      </StyledCharacterSearch>
      {searchResults && (
        <SearchResults loading={loading} searchResults={searchResults} />
      )}
    </div>
  );
};

export default CharacterSearch;
