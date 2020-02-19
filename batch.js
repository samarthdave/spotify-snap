const csv = require('csv-parser');
const fs = require('fs');

const utils = require('./utils');
const { downloadImage } = require('./browser');
const CONSTANTS = require('./constants');

const songDataList = [];
const imageConfig = CONSTANTS['compact'];
let processedSongs = [];

// check if 3rd argument passed is a file
const argLen = process.argv.length;
if (argLen !== 3) {
  console.log(`Error: Provide filename argument with csv file. ${argLen} passed.`);
  process.exit(1);
}

const filename = process.argv[2];

const onFinishRead = async () => {
  // step 1: read in old array & validate inputs
  console.log(`${filename} was successfully processed.`);
  // begin clean of links & call browser directly

  console.log(`Processing ${songDataList.length} songs now...`);
  // map over links and return populated information
  processedSongs = songDataList.map((url) => {
    return {
      res: utils.validateMedia({
        // TODO: read in csv line or check if track or album
        // and read image config type (compact or large?)
        type: 'track', // track by default in batch import
        media_id: url
      }),
      imageConfig
    };
  });
  console.log('Done batch processing songs...');

  console.log('Begin Browser download');
  // step 2: download all data with batch feature
  let imageResponse;
  try {
    await downloadImage({
      songs: processedSongs
    });
  } catch(e) { throw e; } // catch & throw errors
  console.log('Finished browser install.');
};

fs.createReadStream(filename)
  .pipe(csv())
  .on('data', (row) => {
    songDataList.push(row['(link)']);
  })
  .on('end', onFinishRead)
  .on('error', () => {
    console.log(`Error in reading or parsing ${filename} :(`);
  });