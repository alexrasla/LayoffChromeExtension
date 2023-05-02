import axios from 'axios'
import fs from 'fs'
import path from 'path'

const content = await fs.promises.readFile(path.join(process.cwd(), './credentials/crunchbase/api-key.json'));

export async function checkCrunchbase(uri) {
    let res = await axios.get(`https://api.crunchbase.com/api/v4/entities/organizations/${uri}`, {
        headers: {
            "X-cb-user-key": JSON.parse(content).CRUNCHBASE_KEY
        },
        params: {
            card_ids: "fields"
        }
    })

    // TODO: do check against linkedin URL... 
    // TODO: if error returned from using ^, do autocomplete and use Linkedin title
    if (res) return res.data
    return null
}