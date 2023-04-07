import axios from 'axios'

function getLayoffFyiData() {

    axios.get("http://127.0.0.1:3000/layoffs-rsshub").then(({ data }) => {
        let res = JSON.parse(data)
        for (let i = 0; i < res.title.length; i++) {
            if (res.title[i] == 'Atlassian Layoffs Happening!') {
                console.log(
                    res['title'][i],
                    res['pubDate'][i],
                    res['link'][i]
                )
                document.getElementById("showresulthere").innerHTML = res.title[i];

            }
        }
    })

}

getLayoffFyiData()