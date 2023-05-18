const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

async function checkCrunchbase(companyName) {
    const content = await fs.readFile(path.join(process.cwd(), './credentials/crunchbase/api-key.json'));
    const { data } = await axios.get(`https://api.crunchbase.com/api/v4/autocompletes`, {
        headers: {
            "X-cb-user-key": JSON.parse(content).CRUNCHBASE_KEY
        },
        params: {
            query: companyName,
            card_ids: "fields"
        }
    });

    const uri = data.entities[0].identifier.permalink;

    const { data: orgData } = await axios.get(`https://api.crunchbase.com/api/v4/entities/organizations/${uri}`, {
        headers: {
            "X-cb-user-key": JSON.parse(content).CRUNCHBASE_KEY
        },
        params: {
            card_ids: "fields"
        }
    });

    return orgData;
}

module.exports = checkCrunchbase;
