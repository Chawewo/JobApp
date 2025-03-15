// MUI imports
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
import calcLayoutHeight from '@/utils/helpers/layoutHeight';
import { useState } from 'react';

function JobApp() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [open, setOpen] = useState(false);

  // Dummy data
  const jobsData = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Wendy's",
      description: "We are looking for a  highly qualified frontend customer service representative.",
      datePosted: "2025-03-10"
    },
    {
      id: 2,
      title: "Backend Engineer",
      company: "Nvidia or sumn",
      description: "Seeking a backend engineer proficient in Node.js, Express, and MongoDB. You'll be responsible for building scalable APIs and ensuring data integrity.",
      datePosted: "2025-03-12"
    },
    {
      id: 3,
      title: "Full Stack Developer",
      company: "Palantir",
      description: "Join our team as a full stack developer working on cutting-edge applications using React, Node.js, and AWS. Must have experience with CI/CD pipelines.",
      datePosted: "2025-03-09"
    },
    {
      id: 4,
      title: "Flippin Burgers",
      company: "Wendy's",
      description: "you will be here soon.",
      datePosted: "2025-03-13"
    }
  ];

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle card click to open dialog
  const handleCardClick = (job) => {
    setSelectedJob(job);
    setOpen(true);
  };

  // Handle dialog close
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      minHeight={`calc(100vh - ${calcLayoutHeight('header', false) + calcLayoutHeight('footer', false)}px)`}
      p="5%"
      sx={{
        color: 'black',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Available Jobs
      </Typography>
      
      <Grid container spacing={3}>
        {jobsData.map((job) => (
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
                  Posted on: {formatDate(job.datePosted)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Job Details Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        {selectedJob && (
          <>
            <DialogTitle sx={{ m: 0, p: 2, pb: 0 }}>
              {selectedJob.title}
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{ pt: 1 }} dividers>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {selectedJob.company}
              </Typography>
              <Typography gutterBottom variant="body1">
                {selectedJob.description}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>
                Posted on: {formatDate(selectedJob.datePosted)}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
              <Button variant="contained" color="primary">
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