const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');
const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer');

// Boolean variable to track whether the email has been sent
let emailSent = false;

process.setMaxListeners(Number.MAX_SAFE_INTEGER);
// Function to fetch stock price from the provided URL
async function fetchStockPrice(url) {
    try {
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();

        // Set a longer timeout for page navigation
        await page.setDefaultNavigationTimeout(60000); // 60 seconds

        await page.goto(url, { waitUntil: 'domcontentloaded' });

        // Wait for the stock price element to be present on the page
        await page.waitForSelector('fin-streamer[data-test="qsp-price"] span[class*="e3b14781"]');

        // Extract the text content from the span within the fin-streamer element
        const stockPriceElement = await page.$('fin-streamer[data-test="qsp-price"] span[class*="e3b14781"]');
        const stockPriceText = stockPriceElement ? await stockPriceElement.evaluate(el => el.textContent.trim()) : '';

        // Further processing to obtain a clean numeric representation of the stock price
        const cleanStockPrice = processStockPrice(stockPriceText);

        await browser.close();

        return cleanStockPrice;
    } catch (error) {
        console.error('Error fetching stock price:', error.message);
        return null;
    }
}

// Function to process the raw stock price text and obtain a clean numeric representation
function processStockPrice(rawText) {
    const numericValue = parseFloat(rawText.replace(/[^\d.-]/g, ''));
    return numericValue;
}

// Function to send email notification
async function sendEmailNotification(to, subject, text) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: 'praveenpj000@gmail.com',
        to,
        subject,
        text
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email notification sent successfully.');
        // Set the emailSent variable to true to indicate that the email has been sent
        emailSent = true;
    } catch (error) {
        console.error('Error sending email notification:', error.message);
    }
}

// Example usage within an async function
async function notifyUser() {
    const stockUrl = 'https://finance.yahoo.com/quote/TATAMOTORS.NS?p=TATAMOTORS.NS';
    const targetPrice = 799; // Set the target stock price for notification
    const userEmail = 'praveenpj000@gmail.com';

    try {
        const currentPrice = await fetchStockPrice(stockUrl);

        if (currentPrice !== null) {
            console.log(`Current stock price: ${currentPrice}`);

            // Check if the email has not been sent and the criteria are met
            if (!emailSent && currentPrice >= targetPrice) {
                const emailSubject = 'Tata Motors Stock Price Alert!';
                const emailText = `The Tata Motors stock price has reached ${currentPrice}. Check it out at ${stockUrl}`;
                await sendEmailNotification(userEmail, emailSubject, emailText);
                console.log('Email notification sent.');
                
                // Set the emailSent variable to true only after sending the email
                emailSent = true;
            } else if (emailSent && currentPrice < targetPrice) {
                // Reset the emailSent variable if the stock price falls below the target
                emailSent = false;
            }
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Set up interval to call notifyUser every 2 seconds
setInterval(async () => {
    await notifyUser();
}, 5000);     