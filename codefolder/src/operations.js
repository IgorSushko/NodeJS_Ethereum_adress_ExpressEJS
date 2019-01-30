// const fastluhn = require('fast-luhn');
const fastluhn = require('./luhnByIs.js');

/**
 * @param {String} formdata
 * @returns {boolean|int}
 */
function parseInput(formdata) {
  console.log('chunk', formdata);
  const tmp = formdata.split(':')[1];
  console.log('chunk splitted &', tmp);
  if (!tmp) {
    return false;
  }
  const tmp2 = tmp.split('"')[1];
  console.log('chunk splitted &=', tmp2);
  if (!tmp2) {
    return false;
  }
  const number = tmp2 * 1;
  console.log('chunk splitted &= and transformed to number', number);
  if (!(number > 0)) {
    return 0;
  }
  return number;
}

module.exports.parseAndCheckInput = (formData) => {
  const number = parseInput(formData);
  if (number === false) {
    return ['', 0];
  }
  let showingResult = '';
  if (fastluhn.luhnByIs(number.toString()) === true) {
    showingResult = `Card number: ${number} is valid `;
  } else {
    showingResult = `Card number: ${number} is NOT valid `;
  }
  return [showingResult, number];
};
