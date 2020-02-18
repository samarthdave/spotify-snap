const { prompt, Select } = require('enquirer');

// const { isValidFilename, changeFilename } = require('./utils');
const { downloadImage } = require('./browser');
const CONSTANTS = require('./constants');

// default song (MIDDLE CHILD - J. Cole)
// track/2JvzF1RMd7lE3KmFlsyZD8
// https://open.spotify.com/embed/track/2JvzF1RMd7lE3KmFlsyZD8

const askType = new Select({
  name: 'type',
  message: 'Is it an album or a track?',
  choices: ['track', 'album'],
  initial: 'track'
});

const imageType = new Select({
  name: 'type',
  message: 'What size image? (large - 300x380 compact 300x80)',
  choices: ['compact', 'large'],
  initial: 'compact'
});

const main = async () => {
  const type = await askType.run();

  const { media_id } = await prompt({
    type: 'input',
    name: 'media_id',
    message: `What is the ${type} link/id?`,
    initial: '2JvzF1RMd7lE3KmFlsyZD8'
  });

  const imageSize = await imageType.run();
  const imageConfig = CONSTANTS[imageSize];

  const res = {
    type,
    media_id
  };

  let imageResponse;
  try {
    imageResponse = await downloadImage({
      songs: [{ res, imageConfig }]
    });
  } catch(e) {
    imageResponse = e;
  }

  return imageResponse;
};

main()
  .then((res) => {
    console.log(`Save loc: ${res}`);
    console.log('Done...');
  })
  .catch((err) => {
    console.error(err);
  });