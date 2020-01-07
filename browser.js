const puppeteer = require('puppeteer');
const path = require('path');

const filename = 'media';
const file_loc = path.join(__dirname, 'media', `${filename}.jpg`);

const viewport = {
  width: 300,
  height: 80,
  deviceScaleFactor: 1
}

const downloadImage = async ({ type, media_id }) => {
  const url = `https://open.spotify.com/embed/${type}/${media_id}`;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // resize the page before loading the page
  await page.setViewport(viewport);
  await page.goto(url); // visit the page

  // remove play button - https://stackoverflow.com/questions/50867065/puppeteer-removing-elements-by-class
  const playButtonSelector = '#main > div > div > div.ai.au.ah.av > div.ah.aw.ax.ay.az.b0.b1.b2 > div > div > button';
  await page.evaluate((sel) => {
    let button = document.querySelector(sel);
    button.remove();
  }, playButtonSelector);

  // take the photo
  await page.screenshot({
    path: file_loc
  });

  await browser.close();

  return file_loc;
};

module.exports = {
  downloadImage
};