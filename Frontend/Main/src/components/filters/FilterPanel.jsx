import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  FormControl, 
  FormGroup, 
  FormControlLabel, 
  Checkbox,
  Slider,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Chip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const salaryMarks = [
  { value: 0, label: '$0' },
  { value: 50, label: '$50K' },
  { value: 100, label: '$100K' },
  { value: 250, label: '$250K' },
  { value: 500, label: '$500K+' },
];

function FilterPanel({ onApplyFilters, activeFilters, onClearFilters }) {
  const [jobType, setJobType] = useState({
    fullTime: false,
    partTime: false,
    contract: false,
    internship: false,
    remote: false,
  });

  const [datePosted, setDatePosted] = useState({
    past24Hours: false,
    pastWeek: false,
    pastMonth: false,
    pastThreeMonths: false,
    anytime: false,
  });

  const [salary, setSalary] = useState([0, 500]);
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState({
    entry: false,
    midLevel: false,
    senior: false,
    executive: false,
  });

  // Initialize filters from activeFilters prop
  useEffect(() => {
    if (activeFilters) {
      if (activeFilters.jobType) setJobType(activeFilters.jobType);
      if (activeFilters.datePosted) setDatePosted(activeFilters.datePosted);
      if (activeFilters.salary) setSalary(activeFilters.salary);
      if (activeFilters.location) setLocation(activeFilters.location);
      if (activeFilters.experience) setExperience(activeFilters.experience);
    }
  }, [activeFilters]);

  const handleJobTypeChange = (event) => {
    setJobType({
      ...jobType,
      [event.target.name]: event.target.checked,
    });
  };

  const handleDatePostedChange = (event) => {
    setDatePosted({
      ...datePosted,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSalaryChange = (event, newValue) => {
    setSalary(newValue);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleExperienceChange = (event) => {
    setExperience({
      ...experience,
      [event.target.name]: event.target.checked,
    });
  };

  const handleApplyFilters = () => {
    const filters = {
      jobType,
      datePosted,
      salary,
      location: location.trim(),
      experience,
    };
    onApplyFilters(filters);
  };

  const handleClearFilters = () => {
    setJobType({
      fullTime: false,
      partTime: false,
      contract: false,
      internship: false,
      remote: false,
    });
    setDatePosted({
      past24Hours: false,
      pastWeek: false,
      pastMonth: false,
      pastThreeMonths: false,
      anytime: false,
    });
    setSalary([0, 500]);
    setLocation("");
    setExperience({
      entry: false,
      midLevel: false,
      senior: false,
      executive: false,
    });
    
    onClearFilters();
  };

  // Count active filters to display on chips
  const countActiveFilters = () => {
    let count = 0;
    
    Object.values(jobType).forEach(value => { if (value) count++; });
    Object.values(datePosted).forEach(value => { if (value) count++; });
    Object.values(experience).forEach(value => { if (value) count++; });
    
    if (salary[0] > 0 || salary[1] < 500) count++;
    if (location) count++;
    
    return count;
  };

  const activeFilterCount = countActiveFilters();

  return (
    <Box sx={{ width: '100%', mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" component="div">
          Filters
          {activeFilterCount > 0 && (
            <Chip 
              size="small" 
              label={activeFilterCount} 
              color="primary" 
              sx={{ ml: 1 }}
            />
          )}
        </Typography>
        {activeFilterCount > 0 && (
          <Button 
            variant="text" 
            color="primary" 
            size="small"
            onClick={handleClearFilters}
          >
            Clear All
          </Button>
        )}
      </Box>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Job Type</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={<Checkbox 
                  checked={jobType.fullTime} 
                  onChange={handleJobTypeChange} 
                  name="fullTime" 
                />}
                label="Full-time"
              />
              <FormControlLabel
                control={<Checkbox 
                  checked={jobType.partTime} 
                  onChange={handleJobTypeChange} 
                  name="partTime" 
                />}
                label="Part-time"
              />
              <FormControlLabel
                control={<Checkbox 
                  checked={jobType.contract} 
                  onChange={handleJobTypeChange} 
                  name="contract" 
                />}
                label="Contract"
              />
              <FormControlLabel
                control={<Checkbox 
                  checked={jobType.internship} 
                  onChange={handleJobTypeChange} 
                  name="internship" 
                />}
                label="Internship"
              />
              <FormControlLabel
                control={<Checkbox 
                  checked={jobType.remote} 
                  onChange={handleJobTypeChange} 
                  name="remote" 
                />}
                label="Remote"
              />
            </FormGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Date Posted</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={<Checkbox 
                  checked={datePosted.past24Hours} 
                  onChange={handleDatePostedChange} 
                  name="past24Hours" 
                />}
                label="Past 24 hours"
              />
              <FormControlLabel
                control={<Checkbox 
                  checked={datePosted.pastWeek} 
                  onChange={handleDatePostedChange} 
                  name="pastWeek" 
                />}
                label="Past week"
              />
              <FormControlLabel
                control={<Checkbox 
                  checked={datePosted.pastMonth} 
                  onChange={handleDatePostedChange} 
                  name="pastMonth" 
                />}
                label="Past month"
              />
              <FormControlLabel
                control={<Checkbox 
                  checked={datePosted.pastThreeMonths} 
                  onChange={handleDatePostedChange} 
                  name="pastThreeMonths" 
                />}
                label="Past 3 months"
              />
              <FormControlLabel
                control={<Checkbox 
                  checked={datePosted.anytime} 
                  onChange={handleDatePostedChange} 
                  name="anytime" 
                />}
                label="Anytime"
              />
            </FormGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Salary Range</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ px: 2 }}>
            <Slider
              value={salary}
              onChange={handleSalaryChange}
              valueLabelDisplay="auto"
              marks={salaryMarks}
              min={0}
              max={500}
              valueLabelFormat={(value) => `$${value}K`}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Typography variant="body2">
                Min: ${salary[0]}K
              </Typography>
              <Typography variant="body2">
                Max: {salary[1] === 500 ? "$500K+" : `$${salary[1]}K`}
              </Typography>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Location</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            fullWidth
            placeholder="City, state, or zip code"
            value={location}
            onChange={handleLocationChange}
            variant="outlined"
            size="small"
          />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Experience Level</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={<Checkbox 
                  checked={experience.entry} 
                  onChange={handleExperienceChange} 
                  name="entry" 
                />}
                label="Entry Level"
              />
              <FormControlLabel
                control={<Checkbox 
                  checked={experience.midLevel} 
                  onChange={handleExperienceChange} 
                  name="midLevel" 
                />}
                label="Mid Level"
              />
              <FormControlLabel
                control={<Checkbox 
                  checked={experience.senior} 
                  onChange={handleExperienceChange} 
                  name="senior" 
                />}
                label="Senior Level"
              />
              <FormControlLabel
                control={<Checkbox 
                  checked={experience.executive} 
                  onChange={handleExperienceChange} 
                  name="executive" 
                />}
                label="Executive"
              />
            </FormGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>

      <Box sx={{ mt: 2 }}>
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth 
          onClick={handleApplyFilters}
        >
          Apply Filters
        </Button>
      </Box>
    </Box>
  );
}

export default FilterPanel;