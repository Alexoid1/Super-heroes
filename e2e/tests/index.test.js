const puppeteer = require('puppeteer');
const expect = require('chai').expect;
 
describe('Automated audits checks', ()=>{
 let browser
 let page
 
 
 beforeEach(async function(){
   browser = await puppeteer.launch({
     headless: false,
     slowMo: 50,
     devtools: false,
   });
   page = await browser.newPage();
   await page.setViewport({ width: 1200, height: 900 });
   page.setDefaultTimeout(10000)
   page.setDefaultNavigationTimeout(20000)
 
 })
 
  afterEach(async function(){
    await browser.close();
  })
 
  it('Should return index heroes page and should be a selector call .inputSearch',async function(){
    await page.goto(`https://heroes-gallery.web.app/`);
    await page.waitForSelector('.inputSearch');
  });

  it('Should return index heroes page and should be a selector call .selectFilter',async function(){
    await page.goto(`https://heroes-gallery.web.app/`);
    await page.waitForSelector('.inputSearch');
  });

  it('When a hero card is clicked it should return the hero information',async function(){
    await page.goto(`https://heroes-gallery.web.app/`);
    await page.waitForSelector('#root > div > div > div.header-container > div.dealCards.deal.card1 > div > a');
    await page.click('#root > div > div > div.header-container > div.dealCards.deal.card1 > div > a');
    await page.waitForSelector('.heroTitle');
  })

  it('Search a hero by the name',async function(){
    await page.goto(`https://heroes-gallery.web.app/`);
    await page.waitForSelector('#root > div > div > div:nth-child(1) > form > div > a > input[type=text]');
    await page.type('#root > div > div > div:nth-child(1) > form > div > a > input[type=text]', 'Clare');
    await page.waitForSelector('#root > div > div > div.header-container > div > div > a')
    await page.click('#root > div > div > div.header-container > div > div > a');
    await page.waitForSelector('.heroTitle');
    const title = await page.title();
    expect(title).to.be.a('string', 'Clare')
  })

  it('Search a heroes by category',async function(){
    await page.goto(`https://heroes-gallery.web.app/`);
    await page.waitForSelector('#root > div > div > div.filter > select');
    await page.select('#root > div > div > div.filter > select', 'Ungaran');
    await page.waitForSelector('#root > div > div > div.header-container > div > div > a')
    await page.click('#root > div > div > div.header-container > div > div > a');
    const text = page.$eval('#root > div > div > div > div.powerStats > div.imga > div.apparenceC > div:nth-child(1) > p:nth-child(2)', element => element.textContent.include('Hungaran'))
  })

})