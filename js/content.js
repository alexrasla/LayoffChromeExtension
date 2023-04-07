import axios from 'axios'

function getLayoffFyiData() {
    axios.get("http://127.0.0.1:3000/layoffs-fyi").then((res) => {
        let data = res.data
        for (const element of data) {
            if (element.title == 'Atlassian Layoffs Happening!') {
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
    axios.get("http://127.0.0.1:3000/us-warn").then((res) => {
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

getLayoffFyiData()
getUSWarnData()