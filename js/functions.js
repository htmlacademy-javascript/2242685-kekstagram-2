function checkStringLength (stringToCheck, stringLength) {
  return stringToCheck.length <= stringLength;
}
//console.log(checkStringLength('Проверка длины строки', 10));

function checkPalindrome (stringToCheck) {
  const normalizedString = stringToCheck.replaceAll(' ', '').toLowerCase();
  let reverseString = '';
  for (let i = normalizedString.length - 1; i >= 0; i--) {
    reverseString += normalizedString[i];
  }
  return normalizedString === reverseString;
}
//console.log(checkPalindrome('А роза упала на лапу Азора'));

function extractNumbers (stringToExtract) {
  let numbersString = '';
  if (typeof stringToExtract === 'number') {
    stringToExtract = stringToExtract.toString();
  }
  stringToExtract = stringToExtract.replaceAll(' ', '');
  for (let i = 0; i < stringToExtract.length; i++) {
    if (!isNaN(stringToExtract[i])) {
      numbersString += stringToExtract[i];
    }
  }
  return parseInt(numbersString, 10);
}
//console.log(extractNumbers(' d1f23 gh4@5j'));
