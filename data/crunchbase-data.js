import fs from 'fs'
import path from 'path'
import axios from 'axios'

const CRUNCHASE_KEY_PATH = path.join(process.cwd(), './credentials/crunchbase/api-key.json');

export async function getCrunchbaseCompanyAutocomplete(uri) {
    const content = await fs.promises.readFile(CRUNCHASE_KEY_PATH);

    let res = await axios.get('https://api.crunchbase.com/api/v4/autocompletes', {
        headers: {
            "X-cb-user-key": JSON.parse(content).CRUNCHBASE_KEY
        },
        params: {
            query: uri,
            collection_ids: 'organizations'
        },
        data: {
            field_ids: ['uuid', 'identifier', 'fields'],
            order: [
                {
                    "field_id": "rank_org_company",
                    "sort": "asc"
                }
            ]
        }
    })

    let data = res.data
    if (data.count == 0) {
        return "None found"
    }

    for (const company of data.entities) {
        let result = await getCrunchbaseCompany(company.identifier.uuid, uri)
        if (result) {
            console.log('res', result)
            return result
        }
    }
}

export async function getCrunchbaseCompany(uuid, linkedin_url) {
    const content = await fs.promises.readFile(CRUNCHASE_KEY_PATH);

    let res = await axios.get(`https://api.crunchbase.com/api/v4/entities/organizations/${uuid}`, {
        headers: {
            "X-cb-user-key": JSON.parse(content).CRUNCHBASE_KEY,
        },
        params: {
            card_ids: "fields"
        }
    })

    let data = res.data
    // console.log(res.data)
    if (data.cards.fields.linkedin) {
        let company_linkedin = data.cards.fields.linkedin.value.split('/')

        console.log(company_linkedin[company_linkedin.length - 1], linkedin_url)
        if (company_linkedin[company_linkedin.length - 1] == linkedin_url) {
            return data
        }
    }

    return null
}
