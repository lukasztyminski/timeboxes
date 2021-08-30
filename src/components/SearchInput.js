import React, { useEffect, useState } from 'react';

const SearchInput = ({ onSearchSubmit, clearResults }) => {
  const [term, setTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState(term);

  useEffect(() => {
    const timer = setTimeout(() => setTerm(debouncedTerm), 1000);
    return () => clearTimeout(timer);
  }, [debouncedTerm]);

  useEffect(() => {
    if (term !== '') {
      onSearchSubmit(term);
    } else {
      clearResults();
    }
  }, [term, onSearchSubmit, clearResults]);
  return (
    <div className="search-input__container">
      <h1>Wyszukaj timeboxes</h1>
      <input
        type="text"
        value={debouncedTerm}
        onChange={(e) => setDebouncedTerm(e.target.value)}
        placeholder="Search timebox by all"
      />
    </div>
  );
};

export default SearchInput;
