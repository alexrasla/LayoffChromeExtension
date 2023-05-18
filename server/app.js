const fs = require('fs').promises;
const express = require('express');
const cors = require('cors');
const { checkCrunchbase } = require('./js/crunchbase.js');
const { checkGoogleNews } = require('./js/google-news.js');

const hostname = '127.0.0.1';
const port = 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.get('/data', async function (req, res) {
    let data = JSON.parse(await fs.readFile('./data/transformedData.json'));
    res.send(data);
})

app.post('/check-crunchbase', async function (req, res) {
    let data = await checkCrunchbase(req.body.data.companyName); //add uri
    res.send(data);
})

app.post('/articles', async function (req, res) {
    let data = await checkGoogleNews(req.body.data.companyName); //add uri
    res.send(data);
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
