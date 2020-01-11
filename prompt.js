const { prompt, Select } = require('enquirer');

// const { isValidFilename, changeFilename } = require('./utils');
const { downloadImage } = require('./browser');
const CONSTANTS = require('./constants');

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
  const imageSize = await imageType.run();
  const imageConfig = CONSTANTS[imageSize];

  const { media_id } = await prompt({
    type: 'input',
    name: 'media_id',
    message: `What is the ${type} link/id?`,
    initial: '69uxyAqqPIsUyTO8txoP2M'
  });

  const res = {
    type,
    media_id
  };

  return await downloadImage(res, imageConfig);
};

main()
  .then((res) => {
    console.log(res);
    console.log('Done...');
  })