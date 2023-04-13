import fs from 'fs'
import express from 'express';
import cors from 'cors';
import { checkCrunchbase } from './js/crunchbase.js'
import { checkGoogleNews } from './js/google-news.js';

const hostname = '127.0.0.1';
const port = 3000;

const app = express()
app.use(cors())
app.use(express.json());

app.get("/layoffs-fyi", async function (req, res) {
    const data = JSON.parse(await fs.promises.readFile('./data/layoff-fyi.json'))
    res.send(data)
});

app.post('/check-crunchbase', async function (req, res) {
    let data = await checkCrunchbase(req.body.data.uri) //add uri
    res.send(data)
})

app.post('/get-articles', async function (req, res) {
    let data = await checkGoogleNews(req.body.data.companyName) //add uri
    res.send(data)
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});