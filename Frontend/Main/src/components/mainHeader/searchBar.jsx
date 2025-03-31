import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
// Icons
import SearchIcon from '@mui/icons-material/Search';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onSearch(newQuery); // Send query to parent component (JobApp)
  };

  return (
    <Stack component="form">
      <TextField
        size="small"
        color="primary"
        value={query}
        onChange={handleChange}
        InputProps={{
          name: 'search',
          endAdornment: (
            <InputAdornment position="end">
              <IconButton color="primary">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
          sx: {
            pr: 0,
            bgcolor: 'background.paper',
            borderRadius: '20px',
            overflow: 'hidden',
            height: 40,
          },
          inputProps: {
            sx: {
              transition: '0.3s padding',
              pl: 1.5,
              '&:not(:placeholder-shown), &:focus': {
                pl: 3,
              },
            },
          },
        }}
        placeholder="Search jobs by title..."
        variant="outlined"
        fullWidth
      />
    </Stack>
  );
}

export default SearchBar;