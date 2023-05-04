import axios from 'axios'
import fs from 'fs'
import path from 'path'

const content = await fs.promises.readFile(path.join(process.cwd(), './credentials/crunchbase/api-key.json'));

export async function checkCrunchbase(companyName) {
    let { data } = await axios.get(`https://api.crunchbase.com/api/v4/autocompletes`, {
        headers: {
            "X-cb-user-key": JSON.parse(content).CRUNCHBASE_KEY
        },
        params: {
            query: companyName,
            card_ids: "fields"
        }
    })

    let uri = data.entities[0].identifier.permalink

    return await axios.get(`https://api.crunchbase.com/api/v4/entities/organizations/${uri}`, {
        headers: {
            "X-cb-user-key": JSON.parse(content).CRUNCHBASE_KEY
        },
        params: {
            card_ids: "fields"
        }
    }).then(({ data }) => data)
}