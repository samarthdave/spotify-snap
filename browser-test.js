const puppeteer = require('puppeteer');
const path = require('path');

const track_id = '69uxyAqqPIsUyTO8txoP2M';
const url = `https://open.spotify.com/embed/track/${track_id}`;

const filename = 'track';
const file_loc = path.join(__dirname, 'media', `${filename}.jpg`);

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // resize the page before loading the page
  await page.setViewport({
    width: 300,
    height: 80,
    deviceScaleFactor: 1,
  });
  // load the page  
  await page.goto(url);

  await page.screenshot({
    path: file_loc
  });

  await browser.close();
})();
