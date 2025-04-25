import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

function SearchBar({ onSearch, activeFilters, onFilterRemove }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  // Group filters by type to display them nicely
  const groupedFilters = activeFilters.reduce((acc, filter) => {
    if (!acc[filter.filterType]) {
      acc[filter.filterType] = [];
    }
    acc[filter.filterType].push(filter);
    return acc;
  }, {});

  const getFilterLabel = (filter) => {
    // Format the filter label based on type
    switch (filter.filterType) {
      case 'salary':
        return `Salary: ${filter.title}`;
      case 'datePosted':
        return `Posted: ${filter.title}`;
      default:
        return filter.title;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          maxWidth: '600px',
          margin: '0 auto'
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search for job titles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mr: 1 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!query.trim()}
        >
          Search
        </Button>
      </Box>

      {/* Active Filters Display */}
      {activeFilters.length > 0 && (
        <Box sx={{ mt: 2, maxWidth: '900px', margin: '0 auto' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Active filters:
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {activeFilters.map((filter) => (
              <Chip
                key={filter.id}
                label={getFilterLabel(filter)}
                onDelete={() => onFilterRemove(filter)}
                color="primary"
                variant="outlined"
                size="small"
                sx={{ mb: 1 }}
              />
            ))}
            {activeFilters.length > 0 && (
              <Chip
                label="Clear all filters"
                onClick={() => onFilterRemove('all')}
                color="secondary"
                size="small"
                sx={{ mb: 1 }}
              />
            )}
          </Stack>
        </Box>
      )}
    </Box>
  );
}

export default SearchBar;