import axios from 'axios'
import { parseString } from "xml2js";

export async function checkGoogleNews(comapanyName) {

    let res = await axios.get(`https://news.google.com/rss/search`, {
        params: {
            q: `${comapanyName} layoffs`,
            hl: "en-US",
            gl: "US",
            ceid: "US:en"
        }
    })

    let result = null

    parseString(res.data, function (err, results) {
        let data = JSON.parse(JSON.stringify(results))
        result = data.rss.channel[0].item
    });

    return result
}