import axios from 'axios'
import { checkHadLayoffs } from './data.js'

const NUM_ARTICLES = 3

async function getCompanyFromCrunchbase(uri) {
    let res = await axios.post('http://127.0.0.1:3000/check-crunchbase', {
        data: {
            uri: uri,
        }
    })
    return res.data
}

async function getArticles(companyName) {
    let res = await axios.post('http://127.0.0.1:3000/articles', {
        data: {
            companyName: companyName,
        }
    })

    return res.data
}

chrome.tabs.query({ active: true, lastFocusedWindow: true }, async (tabs) => {
    let url = tabs[0].url;
    let permalink = url.split('/')
    let uri = permalink[permalink.length - 2]

    let companyDetails = await getCompanyFromCrunchbase(uri)
    let companyName = companyDetails.properties.identifier.value

    document.getElementById("comapanyName").innerHTML = JSON.stringify(companyName)

    checkHadLayoffs(companyName).then((res) => {
        if (res) {
            document.getElementById("date").innerHTML = res.Date
            document.getElementById("location").innerHTML = res.Location
            document.getElementById("num_laid_off").innerHTML = res.NumberLaidOff
        }
    })

    getArticles(companyName).then((res) => {
        for (let i = 0; i < NUM_ARTICLES; i++) {
            document.getElementById(`article${i}`).innerHTML = res[i].description
        }

    })

});
