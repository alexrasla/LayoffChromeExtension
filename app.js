import axios from 'axios'
import express from 'express';
import cors from 'cors';
import rsshub from 'rsshub';
import dataframe from 'dataframe-js'

const hostname = '127.0.0.1';
const port = 3000;

const app = express()
app.use(cors())

app.get("/layoffs-rsshub", function (req, res) {
    rsshub.init();

    rsshub.request('/layoffs').then((data) => {
        let df = new dataframe.DataFrame(data["item"]);
        res.send(df)
    }).catch((e) => {
        console.log(e);
        res.send("error")
    });
});

app.get("/layoffs-axios", function (req, res) {
    axios.get("https://layoffs.fyi/").then(({ data }) => {
        res.send(data)
    })
});


app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});