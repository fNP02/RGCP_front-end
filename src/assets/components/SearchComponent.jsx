import React from "react";
import { useState, useEffect } from "react";

export const SearchComponent = ({ array, location, setResExt }) => {
  const [results, setResults] = useState([]);
  const [term, setTerm] = useState()

  function normalize(str) {
    return str
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u00C0-\u00D6]/g, "a")
    .replace(/[\u00D8-\u00DE]/g, "e")
    .replace(/[\u00E0-\u00E6]/g, "i")
    .replace(/[\u00E8-\u00EE]/g, "o")
    .replace(/[\u00F0-\u00F6]/g, "u");
  }

  useEffect(() => {
    setResults(
      array?.filter((user) =>
        normalize(user.name).includes(normalize(term))
      )
    );
  }, [term]);

  useEffect(() => {
    setResExt(results);
  }, [results]);

// const getResults = () => results;
  return (
    <>
      <input
        type="text"
        placeholder="Buscar"
        onChange={(e) => setTerm(e.target.value)}
      />
      {/* {results?.length > 0 && (
        <ul>
          {results.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )} */}
    </>
  );

};
