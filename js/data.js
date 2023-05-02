import fs from 'fs'

export async function checkHadLayoffs(companyName) {
    const data = JSON.parse(await fs.promises.readFile('./data/transformedData.json'))

    for (const element of data) {
        console.log(element)
        if (element.Company == companyName) {
            return element
        }
    }
    return null
}

function transformData(readData, writeFile, keyMapping) {
    const writeData = []

    for (const element of readData) {
        let obj = new Object();
        obj.Company = element[keyMapping.Company].split('-')[0]
            .split(' (')[0]
            .split(',')[0]
            .split('*')[0]
            .split(/ LLC/i)[0]
            .split(/ INC/i)[0]

        obj.Date = element[keyMapping.Date]
        obj.NumberLaidOff = element[keyMapping.NumberLaidOff]
        obj.Location = element[keyMapping.Location]

        writeData.push(obj)
    }

    fs.writeFile(writeFile, JSON.stringify(writeData), (err) => {
        if (err) {
            console.log(err);
        }
    })
}

async function updateData() {
    const usWarnData = JSON.parse(await fs.promises.readFile('./data/us-warn.json'))
    const layoffFyiData = JSON.parse(await fs.promises.readFile('./data/layoff-fyi.json'))

    transformData(usWarnData, './data/transformedData.json', {
        Company: 'Company Name',
        Date: 'Layoff Date',
        NumberLaidOff: '# Laid off',
        Location: 'State'
    })

    transformData(layoffFyiData, './data/transformedData.json', {
        Company: 'Company',
        Date: 'Date',
        NumberLaidOff: '# Laid Off',
        Location: 'Country'
    })
}
