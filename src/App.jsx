// src/App.jsx
import { useState } from 'react';
import { scrapeData } from './scrape';

function App() {
  const [url, setUrl] = useState('');
  const [scrapedData, setScrapedData] = useState({ headings: [], paragraphs: [], links: [] });

  const handleScrape = async () => {
    // Scrape data from the given URL
    const data = await scrapeData(url);
    setScrapedData(data);
  };

  return (
    <div className="App">
      <h1>Web Scraping with jsdom</h1>
      
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter a URL"
      />
      <button onClick={handleScrape}>Scrape</button>

      <div>
        <h2>Scraped Data:</h2>
        <div>
          <h3>Headings:</h3>
          <ul>
            {scrapedData.headings.map((heading, index) => (
              <li key={index}>{heading}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3>Paragraphs:</h3>
          <ul>
            {scrapedData.paragraphs.map((paragraph, index) => (
              <li key={index}>{paragraph}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Links:</h3>
          <ul>
            {scrapedData.links.map((link, index) => (
              <li key={index}><a href={link} target="_blank" rel="noopener noreferrer">{link}</a></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
