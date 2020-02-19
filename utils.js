const validator = require('validator');

const isValidFilename = (f_name) => {
  const filenamePattern = /^[-\w^&'@{}[\],$=!#().%+~ ]+$/;
  return filenamePattern.test(f_name);
};

const buildURL = ({ type, media_id }) => {
  return `https://open.spotify.com/embed/${type}/${media_id}`;
};

const changeFilename = (probe, fallback) => {
  // split by space and join with underscores
  const newName = probe.toLowerCase().split(' ').join('-');

  let final = isValidFilename(newName) ? newName : fallback;
  
  // then add jpg to the end...
  return final.concat('.jpg');
};

// validateMedia
// take in URL or weird colon formats as shown here:
// https://developer.spotify.com/documentation/widgets/generate/play-button/
// returns proper media id & type
const validateMedia = (res) => {
  let { type, media_id } = res;

  // if we're sure that it's an id
  if (validator.isURL(media_id)) {
    // split & parse
    const paths = media_id.split('/').filter(i => i.length > 0);
    // get last 2 items
    const pathsSize = paths.length;
    if (pathsSize < 2) {
      return new Error(`Invalid URL length. Cannot parse ${media_id}`);
    }
    // the last 2 items contain the data (ideally)
    return {
      media_id: paths[pathsSize-1], // .../album/MEDIA_ID
      type: paths[pathsSize-2]      // .../track/...
    };
  }

  // another format: "spotify:album:1DFixLWuPkv3KT3TnV35m3"
  const cSplit = media_id.split(':');
  const cLen = cSplit.length;
  if (cLen === 3) {
    return {
      media_id: cSplit[cLen-1], // ... :album:MEDIA_ID
      type: cSplit[cLen-2]      // ... :track: ...
    };
  }

  // if none of those, check if you can build into valid URL
  // eg. "1DFixLWuPkv3KT3TnV35m3" --> "...open.spotify.com/.../1DFixLWuPkv3KT3TnV35m3"
  const generatedURL = buildURL({ media_id, type });
  if (validator.isURL(generatedURL)) {
    return { media_id, type };
  }
  
  console.log(new Error(`ERROR: Cannot validate ${media_id} OR ${type}`));
  console.log(new Error(`URL Generated: ${generatedURL}`));
  
  // return the default (MIDDLE CHILD)
  // this song has been on repeat since last year whoops...
  return {
    media_id: '2JvzF1RMd7lE3KmFlsyZD8',
    type: 'track'
  };
};

module.exports = {
  isValidFilename,
  changeFilename,
  validateMedia,
  buildURL
};