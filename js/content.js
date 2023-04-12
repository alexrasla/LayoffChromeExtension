import axios from 'axios'

function getLayoffFyiData() {
    axios.get("http://127.0.0.1:3000/check-layoffs-fyi").then((res) => {
        let data = res.data
        for (const element of data) {
            if (element.title == 'Workit Health Layoffs Happening!') {
                console.log(
                    element.title,
                    element.pubDate,
                    element.link
                )
                document.getElementById("layoff-fyi").innerHTML = element.title
            }
        }
    })
}

function getUSWarnData() {
    axios.get("http://127.0.0.1:3000/us-warn2").then((res) => {
        let data = res.data
        for (const element of data) {
            if (element.company == 'TALASCEND SL, LLC.') {
                console.log(
                    element.company,
                    element.number_workers,
                    element.effective_date
                )
                document.getElementById("us-warn").innerHTML = element.company + " laid off " + element.number_workers + " on " + element.effective_date
            }
        }
    })
}

function getCrunchbaseData(uri) {
    axios.post('http://127.0.0.1:3000/crunchbase', {
        data: {
            uri: uri
        }
    }).then((res) => {
        console.log(res)
    })
}

// chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
//     let url = tabs[0].url;
//     let permalink = url.split('/')
//     let uri = permalink[permalink.length - 2]

//     document.getElementById("current-url").innerHTML = uri

//     getCrunchbaseData(uri)

// });

// crunchbaseData()
getLayoffFyiData()
// getUSWarnData()