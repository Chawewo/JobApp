/* eslint-disable */
// dashboard index.jsx
import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
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
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';

function JobApp() {
  const { activeFilters, onFilterChange } = useOutletContext();
  
  const [selectedJob, setSelectedJob] = useState(null);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [allJobs, setAllJobs] = useState([]); // Store all jobs from API
  const [filteredJobs, setFilteredJobs] = useState([]); // Filtered jobs to display
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchJobs = async (query, location = '') => {
    if (!query) return;
    
    setLoading(true);
    setError('');
    
    try {
      console.log('Sending search query:', query, 'location:', location);
      
      const response = await fetch('http://localhost:5000/api/jobs/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          searchQuery: query,
          location: location || 'United States' // Default to United States
        }),
      });
      
      const result = await response.json();
      console.log('Received response from backend:', result);
      
      if (result.success) {
        console.log(`Received ${result.data.length} jobs`);
        
        const processedJobs = result.data.map((job, index) => {
          const companyName = job.companyName || job.comapnyName || 'Unknown Company';
          const jobDescription = job.jobDescription || 'No description available';
        
          return {
            company: companyName,
            description: jobDescription,
            location: job.formattedLocation || 'Remote',
            employmentType: job.formattedEmploymentStatus || 'Full-time',
            experienceLevel: job.formattedExperienceLevel || 'Not specified',
            datePosted: job.listedAt || new Date().toISOString(),
            salary: job.salaryInsights
              ? parseFloat(job.salaryInsights.replace(/[^0-9.]/g, ''))
              : Math.floor(Math.random() * 150000) + 50000,
            applyUrl: job.companyApplyUrl || job.jobPostingUrl || '#',
            id: job.id || `job-${Math.random().toString(36).substr(2, 9)}`,
            ...job, // <----- PUT THIS LAST
          };
        });
        
        if (location) {
          const locationExists = activeFilters.some(filter => 
            filter.filterType === 'location' && filter.value === location
          );
          
          if (!locationExists) {
            const locationFilter = {
              id: `location-${Math.random().toString(36).substr(2, 9)}`,
              filterType: 'location',
              value: location,
              title: location
            };
            
            onFilterChange([...activeFilters, locationFilter]);
          }
        }

        setAllJobs(processedJobs);
        applyFilters(processedJobs, activeFilters);
      } else {
        console.error('API error:', result.message);
        setError(result.message || 'Failed to fetch jobs');
        setAllJobs([]);
        setFilteredJobs([]);
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('Error connecting to server');
      setAllJobs([]);
      setFilteredJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (jobs, filters) => {
    if (!filters.length) {
      setFilteredJobs(jobs);
      return;
    }

    const filtered = jobs.filter(job => {
      return filters.every(filter => {
        switch (filter.filterType) {
          case 'salary':
            const minSalary = parseInt(filter.value, 10);
            return job.salary >= minSalary;
          
          case 'employmentStatus':
            return job.employmentType === filter.value;
          
          case 'experienceLevel':
            return job.experienceLevel.includes(filter.value);
          
          case 'location':
            return job.location.toLowerCase().includes(filter.value.toLowerCase()) || 
                   filter.value.toLowerCase().includes(job.location.toLowerCase());
          
          case 'datePosted':
            if (filter.value === 'any') return true;
            
            const daysAgo = parseInt(filter.value, 10);
            const postedDate = new Date(job.datePosted);
            const currentDate = new Date();
            const diffTime = Math.abs(currentDate - postedDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            return diffDays <= daysAgo;
          
          default:
            return true;
        }
      });
    });

    setFilteredJobs(filtered);
  };

  const handleSearch = (query, location) => {
    setSearchQuery(query);
    setSearchLocation(location);
    fetchJobs(query, location);
  };

  const handleFilterRemove = (filter) => {
    if (filter === 'all') {
      onFilterChange([]);
    } else {
      const updatedFilters = activeFilters.filter(f => f.id !== filter.id);
      onFilterChange(updatedFilters);
    }
  };

  const handleCardClick = (job) => {
    setSelectedJob(job);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (allJobs.length > 0) {
      applyFilters(allJobs, activeFilters);
    }
  }, [activeFilters, allJobs]);

  return (
    <Box p="5%" sx={{ color: 'black' }}>
      {/* Search Bar with spacing below */}
      <Box sx={{ mb: 3 }}>
        <SearchBar 
          onSearch={handleSearch} 
          activeFilters={activeFilters}
          onFilterRemove={handleFilterRemove}
        />
      </Box>

      <Typography variant="h4" component="h1" gutterBottom>
        Available Jobs
      </Typography>

      {/* Filter information */}
      {activeFilters.length > 0 && filteredJobs.length > 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Showing {filteredJobs.length} of {allJobs.length} jobs matching your filters
        </Typography>
      )}

      {/* Search location display */}
      {searchLocation && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Jobs in {searchLocation}
        </Typography>
      )}

      {/* Loading indicator */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Error message */}
      {error && (
        <Alert severity="error" sx={{ my: 2 }}>
          {error}
        </Alert>
      )}

      {/* No results after filtering */}
      {!loading && allJobs.length > 0 && filteredJobs.length === 0 && (
        <Alert severity="info" sx={{ my: 2 }}>
          No jobs match your current filters. Try adjusting your filter criteria.
        </Alert>
      )}

      <Grid container spacing={3}>
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
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
                  <Box sx={{ mb: 1.5 }}>
                    <Chip 
                      label={job.employmentType} 
                      size="small" 
                      sx={{ mr: 0.5, mb: 0.5 }} 
                    />
                    <Chip 
                      label={job.location} 
                      size="small" 
                      sx={{ mr: 0.5, mb: 0.5 }} 
                    />
                    {job.experienceLevel && (
                      <Chip 
                        label={job.experienceLevel} 
                        size="small" 
                        sx={{ mr: 0.5, mb: 0.5 }} 
                      />
                    )}
                  </Box>
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
              <Box sx={{ mb: 2 }}>
                <Chip 
                  label={selectedJob.employmentType} 
                  size="small" 
                  sx={{ mr: 0.5, mb: 0.5 }} 
                />
                <Chip 
                  label={selectedJob.location} 
                  size="small" 
                  sx={{ mr: 0.5, mb: 0.5 }} 
                />
                {selectedJob.experienceLevel && (
                  <Chip 
                    label={selectedJob.experienceLevel} 
                    size="small" 
                    sx={{ mr: 0.5, mb: 0.5 }} 
                  />
                )}
                {selectedJob.salary && (
                  <Chip 
                    label={`$${selectedJob.salary.toLocaleString()}`} 
                    size="small" 
                    color="success"
                    sx={{ mr: 0.5, mb: 0.5 }} 
                  />
                )}
              </Box>
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