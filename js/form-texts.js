//import {imgUploadForm} from './form.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const textHashtags = imgUploadForm.querySelector('.text__hashtags');
const textDescription = imgUploadForm.querySelector('.text__description');
//const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/;
const hashtagRegex = /^#[a-zа-яё0-9]{1,}$/;

//let messageOnHashtagError = 'Некорректный хэштег';
let messageOnDescriptionError = 'Максимальная длина комментария - 140 символов';


const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const messageOnHashtagsContentsError =
  `хэштег должен начинаться с символа # (решётка) и состоять из букв и цифр без пробелов;
  хэштеги разделяются пробелами`;
const messageOnHashtagsFirstСharacterError = 'хэштег должен начинаться с символа # (решётка)';
const messageOnHashtagsLengthError = 'максимальная длина одного хэштега 20 символов, включая решётку';
const messageOnHashtagsRepetitionError = `хэштэги не должны повторяться;
  хэштеги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом`;
const messageOnHashtagsQuantityError = 'нельзя указать больше пяти хэштегов';

let hashtags = []; // возможно, нужно обнулять
let isCorrectHashtag = true; // возможно, нужно обнулять

function pristineAddValidators () {
  pristine.addValidator(textHashtags, checkHashtagsFirstСharacter, messageOnHashtagsFirstСharacterError, 9, true);
  pristine.addValidator(textHashtags, checkHashtagsContents, messageOnHashtagsContentsError, 7, true);
  pristine.addValidator(textHashtags, checkHashtagsLength, messageOnHashtagsLengthError, 5, true);
  pristine.addValidator(textHashtags, checkHashtagsRepetition, messageOnHashtagsRepetitionError, 3, true);
  pristine.addValidator(textHashtags, checkHashtagsQuantity, messageOnHashtagsQuantityError, 1, true);

  pristine.addValidator(textDescription, validateDescription, messageOnDescriptionError);

}

function checkHashtagsFirstСharacter (value) {
  isCorrectHashtag = true;
  hashtags = value.trim().toLowerCase().split(' ');
  // хэштег начинается с символа # (решётка)
  hashtags.forEach((hashtag) => {
    if (hashtag[0] !== '#') {
      isCorrectHashtag = false;
    }
  });
  // value.trim().split(' ').every((elem) => elem[0] === '#');
  return isCorrectHashtag;
}

function checkHashtagsContents () {
  //строка после решётки должна состоять из букв и чисел
  hashtags.forEach((hashtag) => {
    if (hashtag.length > 1 && !hashtagRegex.test(hashtag)) {
      isCorrectHashtag = false;
    }
  });
  return isCorrectHashtag;
}

function checkHashtagsLength() {
  // максимальная длина одного хэштега 20 символов, включая решётку
  hashtags.forEach((hashtag) => {
    if (hashtag.length > 20) {
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
  if (hashtags.length > 5) {
    isCorrectHashtag = false;
  }
  return isCorrectHashtag;
}

function validateDescription (value) {
  return value.length <= 140;
}

function resetHashtagErrorMessages () {
  //messageOnHashtagError = null;
  messageOnDescriptionError = null;
}

export {pristineAddValidators, pristine, resetHashtagErrorMessages};
