const isValidFilename = (f_name) => {
  const filenamePattern = /^[-\w^&'@{}[\],$=!#().%+~ ]+$/;
  return filenamePattern.test(f_name);
};

const changeFilename = (probe) => {
  // split by space and join with underscores
  const newName = probe.toLowerCase().split(' ').join('-');

  let final = isValidFilename(newName) ? newName : probe;
  
  // then add jpg to the end...
  return final.concat('.jpg');
};

module.exports = {
  isValidFilename,
  changeFilename
};