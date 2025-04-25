/* eslint-disable */
// FilterProvider.jsx
import { useState, useEffect, useMemo } from 'react';
import { FilterContext } from './NavigationFilterHandler';

function FilterProvider({ children }) {
  const [filters, setFilters] = useState(null);
  
  // Initialize filters from localStorage
  useEffect(() => {
    const savedFilters = localStorage.getItem('jobFilters');
    if (savedFilters) {
      try {
        setFilters(JSON.parse(savedFilters));
      } catch (error) {
        console.error('Error parsing saved filters', error);
      }
    }
  }, []);

  // Save filters whenever they change
  useEffect(() => {
    if (filters) {
      localStorage.setItem('jobFilters', JSON.stringify(filters));
    }
  }, [filters]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => {
    return { filters, setFilters };
  }, [filters]);

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
}

export default FilterProvider;