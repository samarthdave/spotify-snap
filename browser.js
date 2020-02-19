const puppeteer = require('puppeteer');
const path = require('path');

const utils = require('./utils');

const prettyPrintResponse = async ({ date, via, status, url, songText, file_loc }) => {
  console.log('------------------------------');
  console.log(`Title        : ${songText}`);
  console.log(`File Name    : ${file_loc}`);
  console.log(`URL          : ${url}`);
  console.log(`Access       : ${date}`);
  console.log(`Via          : ${via}`);
  console.log(`Response Code: ${status}`);
  console.log('------------------------------');
  return true;
}

const downloadImage = async ({ songs }) => {
  // launch the browser only once
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // all url locations/paths
  const songPaths = [];
  // loop thru all songs in arr
  for (let i = 0; i < songs.length; i++) {
    // extract data from singular song
    const { res, imageConfig } = songs[i];
    
    // validate URL integrity & media type
    const { type, media_id } = utils.validateMedia(res);

    // build from the validated data
    const url = encodeURI(utils.buildURL({ type, media_id }));

    // resize the page before loading the page
    await page.setViewport(imageConfig);
    const response = await page.goto(url); // it the page

    // check status of page
    const headers = response.headers();
    const { status: statusCode } = headers;
    // check if successful load
    if (statusCode !== '200') {
      await browser.close();
      return new Error(`Invalid url, status code: ${statusCode}`);
    }

    // remove play button - https://stackoverflow.com/questions/50867065/puppeteer-removing-elements-by-class
    const playButtonSelector = '#main > div > div > div.ai.au.ah.av > div.ah.aw.ax.ay.az.b0.b1.b2 > div > div > button';
    await page.evaluate((sel) => {
      let button = document.querySelector(sel);
      button.remove();
    }, playButtonSelector);

    // get song name return object string name
    const songNameSelector = '#main > div > div > div.ai.au.ah.av > div.ah.bk.bl > div > div.ah.bm.b6.bn > a > div.ae.bv.bt.bu.bw.bx.by.bz > span';
    const element = await page.$(songNameSelector);
    
    // extract text from element & validate file name
    const songText = await page.evaluate(element => element.textContent, element);
    const filename = utils.changeFilename(songText, 'media'); // returns "*.jpg"
    const file_loc = path.join(__dirname, 'media', filename);

    await prettyPrintResponse({ ...headers, url, songText, file_loc });

    // take a photo
    await page.screenshot({
      path: file_loc
    });

    songPaths[i] = file_loc;
  } // end for loop
 
  await browser.close();

  return songPaths;
};

module.exports = {
  downloadImage
};