const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://ca.roccat.com/blogs/news/gta-san-andreas-cheats-for-pc-and-console';

axios.get(url, { timeout: 5000 })
  .then((response) => {
    const $ = cheerio.load(response.data);

    // Extract relevant data from the webpage
    const cheats = [];
    $('ul li span').each((index, element) => {
      const cheatText = $(element).text().trim();
      cheats.push(cheatText);
    });

    // Save cheats to a text file
    const filePath = 'gtaCheats.txt';
    fs.writeFileSync(filePath, cheats.join('\n'));

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
