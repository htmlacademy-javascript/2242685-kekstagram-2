
// ограничения полей ввода текста (хэштеги и комментарий)
const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAGS_QUANTITY = 5;
const MAX_DESCRIPTION_LENGTH = 140;

// сообщения об ошибках заполнения полей ввода текста
const MESSAGE_ON_DESCRIPTION_ERROR = 'Максимальная длина комментария - 140 символов';
const MESSAGE_ON_HASHTAGS_CONTENTS_ERROR =
  `хэштег должен начинаться с символа # (решётка) и состоять из букв и цифр без пробелов;
  хэштеги разделяются пробелами`;
const MESSAGE_ON_HASHTAGS_FIRST_СHARACTER_ERROR = 'хэштег должен начинаться с символа # (решётка)';
const MESSAGE_ON_HASHTAGS_LENGTH_ERROR = 'максимальная длина одного хэштега 20 символов, включая решётку';
const MESSAGE_ON_HASHTAGS_REPETITION_ERROR = 'хэштэги не должны повторяться; хэштеги нечувствительны к регистру';
const MESSAGE_ON_HASHTAGS_QUANTITY_ERROR = 'нельзя указать больше пяти хэштегов';
const MESSAGE_ON_HASHTAGS_ONLY_NUMBERSIGN_ERROR = 'хештег не может состоять только из одной решётки';

const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,}$/; // регулярное выражение для проверки хэштега

let pristine = {};
const imgUploadForm = document.querySelector('.img-upload__form');
const textHashtags = imgUploadForm.querySelector('.text__hashtags');
const textDescription = imgUploadForm.querySelector('.text__description');
let hashtags = []; // возможно, нужно обнулять
let isCorrectHashtag = true; // возможно, нужно обнулять

function createPristine () {
  pristine = new Pristine(imgUploadForm, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'img-upload__field-wrapper--error'
  });
}

function pristineAddValidators () {
  pristine.addValidator(textHashtags, checkHashtagsFirstСharacter, MESSAGE_ON_HASHTAGS_FIRST_СHARACTER_ERROR, 9, true);
  pristine.addValidator(textHashtags, checkHashtagsOnlyNumberSign, MESSAGE_ON_HASHTAGS_ONLY_NUMBERSIGN_ERROR, 8, true);
  pristine.addValidator(textHashtags, checkHashtagsContents, MESSAGE_ON_HASHTAGS_CONTENTS_ERROR, 7, true);
  pristine.addValidator(textHashtags, checkHashtagsLength, MESSAGE_ON_HASHTAGS_LENGTH_ERROR, 5, true);
  pristine.addValidator(textHashtags, checkHashtagsRepetition, MESSAGE_ON_HASHTAGS_REPETITION_ERROR, 3, true);
  pristine.addValidator(textHashtags, checkHashtagsQuantity, MESSAGE_ON_HASHTAGS_QUANTITY_ERROR, 1, true);

  pristine.addValidator(textDescription, validateDescription, MESSAGE_ON_DESCRIPTION_ERROR);
}

function checkHashtagsFirstСharacter (value) {
  // присвоение значения переменной isCorrectHashtag и создание массива хэштегов должны находиться в первой по порядку проверке (максимальное значение параметра priority в Pristine)
  isCorrectHashtag = true;
  hashtags = value.trim().toLowerCase().split(/\s+/); // разбиваем на элементы массива, удаляя все, в т.ч. повторяющиеся, пробелы
  // хэштег начинается с символа # (решётка)
  hashtags.forEach((hashtag) => {
    if (hashtag.length > 0 && hashtag[0] !== '#') {
      isCorrectHashtag = false;
    }
  });
  return isCorrectHashtag;
}

function checkHashtagsOnlyNumberSign () {
  // хештег не может состоять только из одной решётки
  hashtags.forEach((hashtag) => {
    if (hashtag.length === 1 && hashtag[0] === '#') {
      isCorrectHashtag = false;
    }
  });
  return isCorrectHashtag;
}

function checkHashtagsContents () {
  //строка после решётки должна состоять из букв и чисел
  hashtags.forEach((hashtag) => {
    if (hashtag.length > 1 && !HASHTAG_REGEX.test(hashtag)) {
      isCorrectHashtag = false;
    }
  });
  return isCorrectHashtag;
}

function checkHashtagsLength() {
  // максимальная длина одного хэштега 20 символов, включая решётку
  hashtags.forEach((hashtag) => {
    if (hashtag.length > MAX_HASHTAG_LENGTH) {
      isCorrectHashtag = false;
    }
  });
  return isCorrectHashtag;
}

function checkHashtagsRepetition () {
  // один и тот же хэштег не может быть использован дважды
  if (hashtags.length !== Array.from(new Set(hashtags)).length) {
    isCorrectHashtag = false;
  }
  return isCorrectHashtag;
}

function checkHashtagsQuantity () {
  // нельзя указать больше пяти хэштегов
  if (hashtags.length > MAX_HASHTAGS_QUANTITY) {
    isCorrectHashtag = false;
  }
  return isCorrectHashtag;
}

function validateDescription (value) {
  return value.length <= MAX_DESCRIPTION_LENGTH;
}

export {createPristine, pristine, pristineAddValidators};
