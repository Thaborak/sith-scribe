import React from "react";
import styled from "styled-components";

const ResultsWrapper = styled.div`
  margin-top: 2rem;
`;

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: black;
  color: yellow;
  padding: 0.5rem;
  text-align: left;
  font-size: 1.2rem;
`;

const TableRow = styled.tr`
  background-color: #222;
  color: white;
`;

const TableCell = styled.td`
  padding: 0.5rem;
  text-align: left; /* Align cells to the left */
`;

const NoResultsMessage = styled.p`
  font-size: 1rem;
`;

function SearchResults({ searchResults, loading }) {
  if (loading) {
    return (
      <LoadingWrapper>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </LoadingWrapper>
    );
  } else {
    return (
      <ResultsWrapper>
        <h2>Search Results</h2>
        {searchResults.length === 0 ? (
          <NoResultsMessage>No results found</NoResultsMessage>
        ) : (
          <Table>
            <thead>
              <tr>
                <TableHeader>Name</TableHeader>
                <TableHeader>Height</TableHeader>
                <TableHeader>Mass</TableHeader>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((character) => (
                <TableRow key={character.name}>
                  <TableCell>{character.name}</TableCell>
                  <TableCell>{character.height}</TableCell>
                  <TableCell>{character.mass}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        )}
      </ResultsWrapper>
    );
  }
}

export default SearchResults;
