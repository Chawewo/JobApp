import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import SearchBar from '@/components/mainHeader/searchBar';
import CircularProgress from '@mui/material/CircularProgress';

function JobApp() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

// In your frontend's JobApp.jsx, modify the fetchJobs function:

const fetchJobs = async (query) => {
  if (!query) return;
  
  setLoading(true);
  setError('');
  
  try {
    console.log('Sending search query:', query);
    
    const response = await fetch('http://localhost:5000/api/jobs/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ searchQuery: query }),
    });
    
    const result = await response.json();
    console.log('Received response from backend:', result);
    
    if (result.success) {
      console.log(`Received ${result.data.length} jobs`);
      setJobs(result.data);
    } else {
      console.error('API error:', result.message);
      setError(result.message || 'Failed to fetch jobs');
      setJobs([]);
    }
  } catch (err) {
    console.error('Error fetching jobs:', err);
    setError('Error connecting to server');
    setJobs([]);
  } finally {
    setLoading(false);
  }
};

  // Handle search submission
  const handleSearch = (query) => {
    setSearchQuery(query);
    fetchJobs(query);
  };

  const handleCardClick = (job) => {
    setSelectedJob(job);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box p="5%" sx={{ color: 'black' }}>
      {/* Search Bar with spacing below */}
      <Box sx={{ mb: 3 }}>
        <SearchBar onSearch={handleSearch} />
      </Box>

      <Typography variant="h4" component="h1" gutterBottom>
        Available Jobs
      </Typography>

      {/* Loading indicator */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Error message */}
      {error && (
        <Typography color="error" sx={{ my: 2 }}>
          {error}
        </Typography>
      )}

      <Grid container spacing={3}>
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job.id}>
              <Card
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)',
                    cursor: 'pointer'
                  }
                }}
                onClick={() => handleCardClick(job)}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="div" gutterBottom>
                    {job.title}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    {job.company}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      mb: 2,
                      display: '-webkit-box',
                      overflow: 'hidden',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 3,
                    }}
                  >
                    {job.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Posted on: {new Date(job.datePosted).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          !loading && (
            <Typography variant="h6" color="text.secondary" sx={{ m: 3, width: '100%', textAlign: 'center' }}>
              {searchQuery ? 'No jobs found. Try a different search.' : 'Search for jobs to get started.'}
            </Typography>
          )
        )}
      </Grid>

      {/* Job Details Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        {selectedJob && (
          <>
            <DialogTitle>
              {selectedJob.title}
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{ position: 'absolute', right: 8, top: 8, color: 'grey.500' }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {selectedJob.company}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                {selectedJob.location} • {selectedJob.employmentType}
              </Typography>
              <Typography gutterBottom variant="body1">
                {selectedJob.description}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>
                Posted on: {new Date(selectedJob.datePosted).toLocaleDateString()}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
              <Button 
                variant="contained" 
                color="primary"
                href={selectedJob.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply Now
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}

export default JobApp;