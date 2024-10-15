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

function isWorkingHours (startTime, endTime, meetingStartTime, meetingDuration) { // Время - строка в формате часы:минуты. meetingDuration - число в минутах
  const startTimeInMinutes = timeToMinutes(startTime);
  const endTimeInMinutes = timeToMinutes(endTime);
  const meetingStartTimeInMinutes = timeToMinutes(meetingStartTime);
  return (meetingStartTimeInMinutes >= startTimeInMinutes) && (meetingStartTimeInMinutes + meetingDuration <= endTimeInMinutes);
  //console.log(endTimeInMinutes);
}

function timeToMinutes (timeInHours) { // время с полуночи в минутах
  const timeArray = timeInHours.split(':'); // '8:30' -> ['8', '30']
  return Number(timeArray[0]) * 60 + Number(timeArray[1]);
}

isWorkingHours('8:30', '17:30', '12:30', 300);
