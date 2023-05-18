import axios from 'axios'

const NUM_ARTICLES = 3

async function getData(uri) {
    let res = await axios.get('http://127.0.0.1:3000/data', {
        data: {
            uri: uri,
        }
    })
    return res.data
}

async function checkHadLayoffs(companyName) {
    const data = await getData()

    for (const element of data) {
        if (element.Company == companyName) {
            return element
        }
    }
    return null
}

async function getCompanyFromCrunchbase(companyName) {
    let res = await axios.post('http://127.0.0.1:3000/check-crunchbase', {
        data: {
            companyName: companyName,
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
    let companyName = tabs[0].title.split(' | ')[0]
        .split(':')[0]
        .split(') ')[1]

    let companyDetails = await getCompanyFromCrunchbase(companyName)

    document.getElementById("companyName").innerHTML = companyName
    document.getElementById("description").innerHTML = companyDetails.cards.fields.short_description

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
