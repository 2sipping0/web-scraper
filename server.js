const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());
// Serve static files from the 'public' directory
app.use(express.static('public'));

// Main route - serves the HTML interface
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint for scraping
app.post('/api/scrape', async (req, res) => {
  try {
    const { url, selector } = req.body;
    
    if (!url || !selector) {
      return res.status(400).json({ error: 'URL and selector are required' });
    }
    
    // Perform the scraping
    const scrapedData = await scrapeWebsite(url, selector);
    
    // Return the results
    res.json({ success: true, data: scrapedData });
  } catch (error) {
    console.error('Scraping error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// API endpoint for email scraping
app.post('/api/scrape-emails', async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }
    
    // Perform the email scraping
    const emails = await scrapeEmails(url);
    
    // Return the results
    res.json({ success: true, data: emails });
  } catch (error) {
    console.error('Email scraping error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Scraping function
async function scrapeWebsite(url, selector) {
  try {
    // Make HTTP request to the URL
    console.log(`Fetching data from ${url}...`);
    const response = await axios.get(url);
    
    // Load HTML content into cheerio
    const $ = cheerio.load(response.data);
    
    // Extract data using the provided selector
    const scrapedData = [];
    $(selector).each((index, element) => {
      scrapedData.push($(element).text().trim());
    });
    
    console.log(`Found ${scrapedData.length} items`);
    return scrapedData;
  } catch (error) {
    console.error(`Error scraping ${url}: ${error.message}`);
    throw error;
  }
}

// Email scraping function
async function scrapeEmails(url) {
  try {
    console.log(`Fetching data from ${url} for email extraction...`);
    const response = await axios.get(url);
    
    // Regular expression to match most email patterns
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    
    // Extract emails from the HTML
    const emails = response.data.match(emailRegex) || [];
    
    // Remove duplicates by using a Set
    const uniqueEmails = [...new Set(emails)];
    
    console.log(`Found ${uniqueEmails.length} unique email addresses`);
    return uniqueEmails;
  } catch (error) {
    console.error(`Error scraping emails from ${url}: ${error.message}`);
    throw error;
  }
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});