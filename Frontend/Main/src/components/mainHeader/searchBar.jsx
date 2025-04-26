import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InputAdornment from '@mui/material/InputAdornment';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

function SearchBar({ onSearch, activeFilters, onFilterRemove }) {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query, location);
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
      case 'location':
        return `Location: ${filter.title}`;
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
          maxWidth: '800px',
          margin: '0 auto',
          position: 'relative'
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          width: '100%', 
          border: '1px solid rgba(0, 0, 0, 0.23)', 
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          {/* Job Title Search Field */}
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Job title, skills, or company"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              sx: { borderRadius: 0, borderRight: 0 }
            }}
            sx={{ 
              '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
              flex: 1.5
            }}
          />
          
          {/* Vertical Divider */}
          <Divider orientation="vertical" flexItem />
          
          {/* Location Search Field */}
          <TextField
            fullWidth
            variant="outlined"
            placeholder="City, state, or remote"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon />
                </InputAdornment>
              ),
              sx: { borderRadius: 0 }
            }}
            sx={{ 
              '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
              flex: 1
            }}
          />
        </Box>
        
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!query.trim()}
          sx={{ ml: 1, height: '56px' }}
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