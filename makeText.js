/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios');
const process = require('process');
const { MarkovMachine } = require('./markov');  // Assuming your MarkovMachine class is in markov.js

/** Handle command line arguments */
let [method, path] = process.argv.slice(2);  // e.g., 'file', 'eggs.txt' or 'url', 'http://example.com/text'

/** Read file and generate Markov text */
function makeTextFromFile(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${filePath}: ${err}`);
      process.exit(1);  // Exit with error code
    } else {
      let mm = new MarkovMachine(data);
      console.log(mm.makeText());
    }
  });
}

/** Fetch URL and generate Markov text */
async function makeTextFromURL(url) {
  try {
    let res = await axios.get(url);
    let mm = new MarkovMachine(res.data);
    console.log(mm.makeText());
  } catch (err) {
    console.error(`Error fetching ${url}: ${err}`);
    process.exit(1);  // Exit with error code
  }
}

/** Main logic to determine method (file or url) */
if (method === 'file') {
  makeTextFromFile(path);
} else if (method === 'url') {
  makeTextFromURL(path);
} else {
  console.error(`Unknown method: ${method}`);
  process.exit(1);  // Exit with error code
}
