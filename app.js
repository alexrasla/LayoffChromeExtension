import express from 'express';
import cors from 'cors';
import { getLayoffFyiData } from './data/layoff-fyi-data.js'
import { authorize, listUSWarn } from './data/us-warn-data.js'

const hostname = '127.0.0.1';
const port = 3000;

const app = express()
app.use(cors())

app.get("/layoffs-fyi", async function (req, res) {
    let data = await getLayoffFyiData()
    res.send(data['item'])
});

app.get("/us-warn", async function (req, res) {
    let client = await authorize()
    let data = await listUSWarn(client)
    // should convert to json
    let json_data = []
    for (const element of data) {
        json_data.push({
            'state': element[0],
            'company': element[1],
            'city': element[2],
            'number_workers': element[3],
            'warn_receive_date': element[4],
            'effective_date': element[5],
            'closure_or_layoff': element[6]

        })
    }
    res.send(json_data);
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});