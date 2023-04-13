import axios from 'axios'
import { checkLayoffFyiData } from './layoff-fyi.js'

async function getCompanyFromCrunchbase(uri) {
    let res = await axios.post('http://127.0.0.1:3000/check-crunchbase', {
        data: {
            uri: uri,
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

    checkLayoffFyiData(companyName).then((res) => {
        if (res) {
            document.getElementById("date").innerHTML = res["Date"]
            document.getElementById("source").innerHTML = res["Source"]
        }
    })

});
