import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/app.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

const client = new MongoClient(url);
const db = client.db('rental');
const collection = db.collection('house');


async function main() {
try {
    await db.command({ ping: 1 });
    console.log(`DB connected to ${config.hostname}`);
 } catch (ex) {
    console.log(`Error with ${url} because ${ex.message}`);
    process.exit(1);
 }
}

main();