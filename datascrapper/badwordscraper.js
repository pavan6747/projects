const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.youswear.com/index.asp?language=Telugu';

axios.get(url, { timeout: 5000 })
  .then((response) => {
    const $ = cheerio.load(response.data);

    // Extract relevant data from the webpage
    const phrases = [];
    $('table tr').each((index, element) => {
      const firstColumn = $(element).find('td:first-child').text().trim();
      const secondColumn = $(element).find('td:nth-child(2)').text().trim();
      if (firstColumn && secondColumn) {
        phrases.push(`${firstColumn} - ${secondColumn}`);
      }
    });

    // Save phrases to a text file
    const filePath = 'teluguPhrases.txt';
    fs.writeFileSync(filePath, phrases.join('\n'));

    console.log(`Text file generated: ${filePath}`);
  })
  .catch((error) => {
    if (error.code === 'ECONNRESET') {
      console.error('Connection reset, retrying...');
      // Retry the request or handle accordingly
    } else {
      console.error('Error fetching data:', error);
    }
  });
