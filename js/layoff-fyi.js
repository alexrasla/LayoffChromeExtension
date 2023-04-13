import axios from 'axios'

async function getLayoffFyiData() {
    let res = await axios.get("http://127.0.0.1:3000/layoffs-fyi")
    let data = res.data

    return data
}

export async function checkLayoffFyiData(company) {
    let data = await getLayoffFyiData()

    for (const element of data) {
        if (element.Company == company) {
            return element
        }
    }

    return null
}


