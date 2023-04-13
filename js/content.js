import { checkLayoffFyiData } from './layoff-fyi.js'

checkLayoffFyiData('Leafly').then((res) => {
    console.log(res)
    if (res) {
        document.getElementById("layoff-fyi").innerHTML = JSON.stringify(res, null, 2)
    }
})

