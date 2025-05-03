// In controllers/jobController.js
const https = require('https');

exports.searchJobs = async (req, res) => {
  try {
    const { searchQuery, location = "United States", count = 25 } = req.body;
    
    if (!searchQuery) {
      return res.status(400).json({ success: false, message: 'Search query is required' });
    }

    // Log the search query for debugging
    console.log('Search query:', searchQuery);
    
    // Create request options
    const options = {
      hostname: 'linkedin-data-scraper.p.rapidapi.com',
      path: '/search_jobs',
      method: 'POST',
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY || 'd3edd189a2mshe44888c3bb0ffc0p1bb66djsnde334dce4876',
        'x-rapidapi-host': 'linkedin-data-scraper.p.rapidapi.com',
        'Content-Type': 'application/json'
      }
    };

    // Create payload - format exactly as shown in your example
    const payload = JSON.stringify({
      "keywords": searchQuery,
      "location": location,
      "count": count
    });
    
    // Log the payload for debugging
    console.log('Sending payload:', payload);

    // Make the request
    const apiRequest = https.request(options, (apiResponse) => {
      let data = '';
      
      apiResponse.on('data', (chunk) => {
        data += chunk;
      });
      
      apiResponse.on('end', () => {
        try {
          console.log('Raw API response:', data); // Log raw response
          
          const parsedData = JSON.parse(data);
          console.log('Parsed API response:', JSON.stringify(parsedData, null, 2)); // Log parsed response
          
          if (parsedData.success && parsedData.response) {
            // Flatten the response if it's nested in another array
            let extractedJobs = Array.isArray(parsedData.response[0]) ? parsedData.response.flat() : parsedData.response;
          
            console.log('Extracted jobs:', JSON.stringify(extractedJobs, null, 2)); // Debugging log
          
            // Ensure extractedJobs is an array before mapping
            if (!Array.isArray(extractedJobs) || extractedJobs.length === 0) {
              console.log('No jobs found in API response');
              return res.json({ success: false, message: 'No jobs found' });
            }
          
            const formattedJobs = extractedJobs.map(job => ({
              id: job.jobPostingUrl?.split('/view/')[1]?.split('/?')[0] || Math.random().toString(36).substring(7),
              title: job.title || 'Unknown Position',
              company: job.companyName || 'Unknown Company',
              description: job.jobDescription || 'No description available',
              datePosted: job.listedAt ? new Date(job.listedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
              location: job.formattedLocation || 'Remote',
              employmentType: job.formattedEmploymentStatus || 'Not specified',
              applyUrl: job.companyApplyUrl || job.jobPostingUrl || '#'
            }));
          
            console.log(`Returning ${formattedJobs.length} jobs`);
            res.json({ success: true, data: formattedJobs });
          }
          
          // If the response structure is different than expected
          else {
            console.log('Unexpected API response structure');
            
            let extractedJobs = [];
            
            
            if (Array.isArray(parsedData)) {
              extractedJobs = parsedData;
            } 
            
            else if (parsedData.data && Array.isArray(parsedData.data)) {
              extractedJobs = parsedData.data;
            }
            
            else if (parsedData.response && Array.isArray(parsedData.response[0])) {
              extractedJobs = parsedData.response[0];
            }
            
            const formattedJobs = extractedJobs.map(job => ({
              id: Math.random().toString(36).substring(7),
              title: job.title || 'Unknown Position',
              company: job.companyName || 'Unknown Company',
              description: job.jobDescription || 'No description available',
              datePosted: job.listedAt ? new Date(job.listedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
              location: job.formattedLocation || 'Remote',
              employmentType: job.formattedEmploymentStatus || 'Not specified',
              applyUrl: job.companyApplyUrl || job.jobPostingUrl || '#'
            }));
            
            console.log(`Extracted ${formattedJobs.length} jobs from alternative structure`);
            res.json({ 
              success: true,
              data: formattedJobs
            });
          }
        } catch (error) {
          console.error('Error parsing API response:', error);
          res.status(500).json({ 
            success: false, 
            message: 'Error processing API response',
            rawData: data
          });
        }
      });
    });
    
    apiRequest.on('error', (error) => {
      console.error('Error with API request:', error);
      res.status(500).json({ success: false, message: 'Error connecting to job search API' });
    });
    
    apiRequest.write(payload);
    apiRequest.end();
    
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};