// src/scrape.js
import { JSDOM } from 'jsdom';

export const scrapeData = async (url) => {
  try {
    // Fetch HTML content from the URL
    const response = await fetch(url);
    const html = await response.text();

    // Create a JSDOM instance from the HTML content
    const dom = new JSDOM(html);

    // Example: Get all headings (h1 tags)
    const headings = [...dom.window.document.querySelectorAll('h1')].map((h1) => h1.textContent);

    // Example: Get all paragraphs (p tags)
    const paragraphs = [...dom.window.document.querySelectorAll('p')].map((p) => p.textContent);

    // Example: Get all links (a tags)
    const links = [...dom.window.document.querySelectorAll('a')].map((a) => a.href);

    return { headings, paragraphs, links };
  } catch (error) {
    console.error('Error scraping data:', error);
    return { headings: [], paragraphs: [], links: [] };
  }
};
