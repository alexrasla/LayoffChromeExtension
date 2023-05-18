const axios = require('axios');
const { parseString } = require("xml2js");

async function checkGoogleNews(comapanyName) {

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

module.exports = checkGoogleNews;
