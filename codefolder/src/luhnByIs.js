// const cardValue = 4532015112830366;4149497848235141
// const cardValue = 4149497848235141;
module.exports.luhnByIs = (cardValue) => {
  const arr = cardValue.toString().split('');
  let summ = 0;
  console.log(...arr);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = parseInt(arr[i], 10);
  }
  for (let i = 0; i < arr.length; i++) {
    if (i % 2 === 0) {
      arr[i] *= 2;
      if (arr[i] > 9) {
        arr[i] -= 9;
      }
    }
    summ += arr[i];
  }
  const result = (summ % 10 === 0);
  console.log(...arr);
  console.log(result);
  return result;
};
