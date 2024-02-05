const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');

async function fetchNifty50Data() {
    try {
        const response = await axios.get('https://finance.yahoo.com/quote/%5ENSEI/components/');
        const $ = cheerio.load(response.data);

        // Assuming the table data is within a specific element with a class
        const tableElements = $('.DataTable tr');

        // Extract data from the table elements
        const nifty50Data = tableElements.map((index, element) => {
            const symbol = $(element).find('.Ta(start) a').text().trim();
            const companyName = $(element).find('.Ta(start):not(:has(a))').text().trim();
            const lastPrice = $(element).find('.Py(10px).Pstart(10px)').eq(0).text().trim();
            const change = $(element).find('.Py(10px).Pstart(10px)').eq(1).text().trim();
            const percentChange = $(element).find('.Py(10px).Pstart(10px)').eq(2).text().trim();
            const volume = $(element).find('.Py(10px).Pstart(10px)').eq(3).text().trim();

            return { symbol, companyName, lastPrice, change, percentChange, volume };
        }).get();

        // Save the data to a text file
        const filePath = './nifty50_data.txt';
        const header = 'Symbol,Company Name,Last Price,Change,% Change,Volume\n';
        const dataToWrite = nifty50Data.map(item =>
            `${item.symbol},${item.companyName},${item.lastPrice},${item.change},${item.percentChange},${item.volume}`
        ).join('\n');

        fs.writeFileSync(filePath, header + dataToWrite, 'utf-8');

        console.log('Nifty 50 Data saved to nifty50_data.txt');
    } catch (error) {
        console.error('Error fetching and saving Nifty 50 data:', error.message);
    }
}

fetchNifty50Data();
