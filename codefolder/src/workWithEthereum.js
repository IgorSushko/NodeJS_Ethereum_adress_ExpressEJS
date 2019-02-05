module.paths.push('/usr/lib/node_modules');
//const bip39 = require('bip39');
//const hdkey = require('ethereumjs-wallet/hdkey');
const Wallet = require('ethereumjs-wallet');
var EthUtil = require('ethereumjs-util');

// Generate pseudorandom part that based on CardNumber
function makeBankRandom(bankCardNumber) {
  const bankCardNumberStr = bankCardNumber.toString();
  const bankValue2 = bankCardNumberStr.split('').reverse().join('');
  const bankSum = bankCardNumber + bankValue2;
  return bankSum;
}

/**
 * @param {String} bankCardNumber
 * @returns {String} WalleteAddress
 */
module.exports.generateWalleteAddress = (bankCardNumber) => {
  if (!bankCardNumber) throw new Error('Plz check card number');
  const randomBytes = makeBankRandom(bankCardNumber);
  if (!randomBytes) throw new Error('Plz check card number randomization');
  const privateKeyBuffer = EthUtil.toBuffer(randomBytes.toString('hex'));
  const wallet = Wallet.fromPrivateKey(privateKeyBuffer);

  const publicKey = wallet.getPublicKeyString();
  console.log(publicKey);
  const address = wallet.getAddressString();
  console.log('igorSu Address :'+ address);
  return address;
};
