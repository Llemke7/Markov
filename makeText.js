/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios');
const MarkovMachine = require('./markov');

// Function to read text from a file
async function readFromFile(filePath) {
    try {
        const text = await fs.promises.readFile(filePath, 'utf-8');
        return text;
    } catch (error) {
        throw new Error(`Error reading file: ${filePath}`);
    }
}

// Function to read text from a URL
async function readFromURL(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching data from URL: ${url}`);
    }
}

// Main function to generate text
async function generateText(source) {
    try {
        let text;
        if (source.startsWith('http')) {
            text = await readFromURL(source);
        } else {
            text = await readFromFile(source);
        }
        const markovMachine = new MarkovMachine(text);
        const generatedText = markovMachine.makeText();
        console.log(generatedText);
    } catch (error) {
        console.error(error.message);
    }
}

// Command line arguments
const [, , sourceType, source] = process.argv;

// Validate arguments
if (!sourceType || !source) {
    console.error('Usage: node makeText.js <file|url> <path|URL>');
    process.exit(1);
}

// Generate text based on source type
generateText(source);
