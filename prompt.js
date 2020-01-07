const { prompt, Select } = require('enquirer');

// const { isValidFilename, changeFilename } = require('./utils');
const { downloadImage } = require('./browser');

const ask = new Select({
  name: 'type',
  message: 'Is it an album or a track?',
  choices: ['track', 'album'],
  initial: 'track'
});

const main = async () => {
  const type = await ask.run();
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

  return await downloadImage(res);
};

main()
  .then((res) => {
    console.log(res);
    console.log('Done...');
  })