import { Builder, Browser, By, Key, until, WebDriver } from 'selenium-webdriver'
import Cheerio from 'cheerio';

export async function getPageSource(url) {
    let driver = await new Builder().forBrowser(Browser.CHROME).build();
    // var pageSource = null
    try {
        await driver.get(url)
        let elements = await driver.findElements(By.css("div[data-columnindex=\"0\"]"))
        console.log(elements)
        for (const element of elements) {
            console.log('here')
            console.log(await element.getAttribute('innerHTML'))
        }
        // elements.forEach(async element => {
        //     // console.log('here')
        //     console.log(await element.getAttribute('innerHTML'))
        // });
        // console.log(await el.getAttribute('innerHTML'))
        // pageSource = driver.wait(until.elementIsVisible(el, 1000))
        // console.log(pageSource)
        // driver.sleep(1000000)
    } finally {
        await driver.quit();
    }

    // return pageSource
};