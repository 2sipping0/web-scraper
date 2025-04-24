# Web Scraper

A simple and powerful web scraping tool built with Node.js, Express, Axios, and Cheerio. This application provides an easy-to-use interface for extracting data from websites using CSS selectors and for finding email addresses on web pages.

## Features

- 🌐 Extract specific content from any website using CSS selectors
- ✉️ Find all email addresses on a webpage
- 🖥️ Clean and intuitive web interface
- 🚀 Fast and efficient scraping
- 💾 JSON output format

## Installation

### Prerequisites

- Node.js (v12 or higher)
- npm (v6 or higher)

### Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/web-scraper.git
   ```

2. Navigate to the project directory:
   ```bash
   cd web-scraper
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Usage

### Content Scraping

1. Enter the URL of the website you want to scrape
2. Specify the CSS selector for the elements you want to extract
3. Click the "Scrape" button
4. View the extracted data in the results area

### Email Scraping

1. Enter the URL of the website you want to scan for emails
2. Click the "Scrape Emails" button
3. View the list of email addresses found on the webpage

## API Endpoints

### Scrape Content

```
POST /api/scrape
```

**Request Body:**
```json
{
  "url": "https://example.com",
  "selector": "p.content"
}
```

**Response:**
```json
{
  "success": true,
  "data": ["Content 1", "Content 2", "Content 3"]
}
```

### Scrape Emails

```
POST /api/scrape-emails
```

**Request Body:**
```json
{
  "url": "https://example.com"
}
```

**Response:**
```json
{
  "success": true,
  "data": ["email1@example.com", "email2@example.com"]
}
```

## Project Structure

```
web-scraper/
├── server.js        # Main server file
├── package.json     # Dependencies and scripts
├── public/          # Static files
│   ├── index.html   # Web interface
│   ├── styles.css    # Styling
│   └── script.js    # Client-side JavaScript
└── README.md        # This file
```

## Technologies Used

- **Express.js**: Web server framework
- **Axios**: HTTP client for making requests
- **Cheerio**: Server-side jQuery implementation for parsing HTML
- **HTML/CSS/JavaScript**: Frontend interface

## License

MIT

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## Disclaimer

This tool is for educational purposes only. Be sure to respect websites' terms of service and robots.txt files. Always be ethical when scraping websites and don't overload servers with requests.