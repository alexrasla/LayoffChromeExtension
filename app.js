import fs from 'fs'
import express from 'express';
import cors from 'cors';

const hostname = '127.0.0.1';
const port = 3000;

const app = express()
app.use(cors())

app.get("/layoffs-fyi", async function (req, res) {
    const data = JSON.parse(await fs.promises.readFile('./data/layoff-fyi.json'))
    res.send(data)
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});