/* eslint-disable */
// NavigationFilterHandler.jsx
import { useContext, createContext } from 'react';

// Create a context for filters
export const FilterContext = createContext({
  filters: null,
  setFilters: () => {},
});

// Custom hook to use filters
export const useFilters = () => {
  return useContext(FilterContext);
};

function NavigationFilterHandler({ navItem, onFilterChange }) {
  const { filters, setFilters } = useFilters();

  // Handle click on navigation filter item
  const handleNavFilterClick = (filterType, filterValue) => {
    // Create a new filters object if it doesn't exist
    let newFilters = filters ? { ...filters } : {
      jobType: {
        fullTime: false,
        partTime: false,
        contract: false,
        internship: false,
        remote: false,
      },
      datePosted: {
        past24Hours: false,
        pastWeek: false,
        pastMonth: false,
        pastThreeMonths: false,
        anytime: false,
      },
      salary: [0, 500],
      location: "",
      experience: {
        entry: false,
        midLevel: false,
        senior: false,
        executive: false,
      }
    };

    // Handle different filter types
    switch (filterType) {
      case 'jobType':
      case 'datePosted':
      case 'experience':
        // Toggle the specific value
        newFilters[filterType] = {
          ...newFilters[filterType],
          [filterValue]: !newFilters[filterType][filterValue]
        };
        break;
        
      case 'salary':
        // Set the salary range
        newFilters.salary = filterValue;
        break;
        
      default:
        console.warn(`Unknown filter type: ${filterType}`);
        return;
    }

    // Update filters context and trigger parent component update
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  // Check if this navigation item is a filter item
  if (navItem.filterType && navItem.filterValue) {
    // For direct filter items
    return (
      <div 
        onClick={() => handleNavFilterClick(navItem.filterType, navItem.filterValue)}
        className={filters && filters[navItem.filterType]?.[navItem.filterValue] ? 'active-filter' : ''}
      >
        {navItem.title}
      </div>
    );
  } else if (navItem.filterType && navItem.menuChildren) {
    // For filter groups with children
    return navItem.menuChildren.map(childItem => (
      <div 
        key={childItem.title}
        onClick={() => handleNavFilterClick(navItem.filterType, childItem.filterValue)}
        className={filters && 
          ((navItem.filterType === 'salary' && filters.salary[0] === childItem.filterValue[0]) || 
           (filters[navItem.filterType]?.[childItem.filterValue])) ? 'active-filter' : ''}
      >
        {childItem.title}
      </div>
    ));
  }

  // Return null for non-filter nav items
  return null;
}

export default NavigationFilterHandler;