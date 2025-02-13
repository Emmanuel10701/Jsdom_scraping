import { JSDOM } from 'jsdom';

export const scrapeData = async (url) => {
  try {
    // Validate URL
    if (!url || typeof url !== 'string') {
      throw new Error('Invalid URL provided');
    }

    // Fetch HTML content from the URL with headers to mimic a real browser
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }

    const html = await response.text();

    // Create a JSDOM instance from the HTML content
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Extract headings (h1 tags)
    const headings = Array.from(document.querySelectorAll('h1')).map((h1) => h1.textContent.trim());
    
    // Extract paragraphs (p tags)
    const paragraphs = Array.from(document.querySelectorAll('p')).map((p) => p.textContent.trim());
    
    // Extract links (a tags) and filter out empty or invalid ones
    const links = Array.from(document.querySelectorAll('a'))
      .map((a) => a.href.trim())
      .filter((href) => href.startsWith('http'));

    return { headings, paragraphs, links };
  } catch (error) {
    console.error('Error scraping data:', error.message);
    return { headings: [], paragraphs: [], links: [] };
  }
};
