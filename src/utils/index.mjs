import fs from 'fs'
import config from '../../package.json'

import {
  getData
} from './getData.mjs'
const dataPath = `${config.files.jsonToCsv}`
const errorsPath = `${config.files.errorData}`

// Init file 
const initialData = fs.readFileSync(config.files.initFile, 'utf-8');

// Fields required by user
const fields = ['initialAddress', 'responseAddress', 'lat', 'lon'];

// Shalman's dev API key
// Change it on your one
const apiKey = config.apikey;

// Callback for Node.js to write file
function appendToFile(path, item) {
  fs.appendFileSync(path, item);
}

// Delete old `result.csv` & `errors.csv` if they exist
fs.existsSync(dataPath) ? fs.unlinkSync(dataPath) : null;
fs.existsSync(errorsPath) ? fs.unlinkSync(errorsPath) : null;

// Getting our CSV
getData(initialData, apiKey, fields, dataPath, errorsPath, appendToFile)
