import { useState } from 'react';
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

function JobApp() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy data
  const jobsData = [
    { id: 1, title: "Frontend Developer", company: "Wendy's", description: "Frontend customer service rep needed.", datePosted: "2025-03-10" },
    { id: 2, title: "Backend Engineer", company: "Nvidia", description: "Node.js backend engineer role.", datePosted: "2025-03-12" },
    { id: 3, title: "Full Stack Developer", company: "Palantir", description: "React, Node.js, and AWS experience required.", datePosted: "2025-03-09" },
    { id: 4, title: "Software Engineer", company: "Google", description: "AI/ML-focused engineering role.", datePosted: "2025-03-13" }
  ];

  // Filter jobs based on search query
  const filteredJobs = jobsData.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <SearchBar onSearch={setSearchQuery} />
      </Box>

      <Typography variant="h4" component="h1" gutterBottom>
        Available Jobs
      </Typography>

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
          <Typography variant="h6" color="text.secondary" sx={{ m: 3 }}>
            No jobs found.
          </Typography>
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
              <Typography gutterBottom variant="body1">
                {selectedJob.description}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>
                Posted on: {new Date(selectedJob.datePosted).toLocaleDateString()}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
              <Button variant="contained" color="primary">Apply Now</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}

export default JobApp;
