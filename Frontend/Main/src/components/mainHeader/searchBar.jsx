import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
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
  );
}

export default SearchBar;