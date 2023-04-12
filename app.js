import express from 'express';
import cors from 'cors';
import { getLayoffFyiData } from './data/layoff-fyi-data.js'
import { authorize, listUSWarn } from './data/us-warn-data.js'
import { getCrunchbaseCompany, getCrunchbaseCompanyAutocomplete } from './data/crunchbase-data.js'
import { getPageSource } from './data/selenium.js'
import fs from 'fs'

const hostname = '127.0.0.1';
const port = 3000;

const app = express()
app.use(cors())

app.get("/layoffs-fyi", async function (req, res) {
    let data = await getLayoffFyiData()
    res.send(data.item)
});

app.get("/check-layoffs-fyi", async function (req, res) {
    const data = JSON.parse(await fs.promises.readFile('./data/Layoffsfyi_Tracker_layoffsfyitracker.2023-4-12.json'))
    res.send(data.item)
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

app.get("/us-warn2", async function (req, res) {
    let pageSource = await getPageSource('https://airtable.com/shrAJ4HMV4X0OgySc/tblP732bg4BNVJOVh')
    // let pageSource = await getPageSource('https://www.warntracker.com/?tab=by-company-and-state')
    if (pageSource.includes('Walmart')) {
        console.log('Walmart')
    }

    fs.writeFileSync('log', pageSource);

    if (pageSource.includes('Atlassian')) {
        console.log('Atlassian')
    }

});

app.post('/crunchbase', async function (req, res) {
    console.log('Got body:', req.body.data.uri);
    let data = await getCrunchbaseCompanyAutocomplete(req.body.data.uri) //add uri

})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});