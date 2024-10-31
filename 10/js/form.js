const scalePercentsMin = 25;
const scalePercentsMax = 100;
const scalePercentsStep = 25;
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const bodyElement = document.querySelector('body');
const scaleControlValue = document.querySelector('.scale__control--value');
let scaleControlValueInPercents = 100;
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const imgUploadPreviewImg = document.querySelector('.img-upload__preview').querySelector('img');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level'); //контейнер слайдера
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectsList = document.querySelector('.effects__list');
let effectValue = '';
let effectData = {};
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const imgUploadForm = document.querySelector('.img-upload__form');
const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/;

const effectsArray = [
  {value: 'none', filter: ''},
  {value: 'chrome', filter: 'grayscale', unit: '', min: 0, max: 1, step: 0.1},
  {value: 'sepia', filter: 'sepia', unit: '', min: 0, max: 1, step: 0.1},
  {value: 'marvin', filter: 'invert', unit: '%', min: 0, max: 100, step: 1},
  {value: 'phobos', filter: 'blur', unit: 'px', min: 0, max: 3, step: 0.1},
  {value: 'heat', filter: 'brightness', unit: '', min: 1, max: 3, step: 0.1}
];

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const textHashtags = imgUploadForm.querySelector('.text__hashtags');
let messageOnHashtagError = 'Некорректный хэштег';
const textDescription = imgUploadForm.querySelector('.text__description');
let messageOnDescriptionError = 'Максимальная длина комментария - 140 символов';


function onSelectPicture () {
  scaleControlSmaller.addEventListener('click', onScaleControl);
  scaleControlBigger.addEventListener('click', onScaleControl);

  //создание слайдера
  noUiSlider.create(effectLevelSlider, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1, //100%
    step: 0.1,
    connect: 'lower',
  });
  effectLevelSlider.noUiSlider.on('update', onSliderUpdate);

  setOriginalPicture();

  effectsList.addEventListener('click', onEffectsList);
  document.addEventListener('keydown', onDocumentKeydown);
  imgUploadCancel.addEventListener('click', closeForm);
  //pristine
  imgUploadForm.addEventListener('submit', pristineValidate);
  pristine.addValidator(textHashtags, validateHashtags, messageOnHashtagError);
  pristine.addValidator(textDescription, validateDescription, messageOnDescriptionError);

  imgUploadOverlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
}

function validateHashtags (value) {
  const hashtagsArray = value.trim().toLowerCase().split(' ');
  let isCorrectHashtag = true;
  // хэштег начинается с символа # (решётка)
  //строка после решётки должна состоять из букв и чисел
  // хеш-тег не может состоять только из одной решётки
  // максимальная длина одного хэштега 20 символов, включая решётку
  // хэштеги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом
  // хэштеги разделяются пробелами
  hashtagsArray.forEach((hashtag) => {
    if (!hashtagRegex.test(hashtag)) {
      isCorrectHashtag = false;
    }
  });
  if (!isCorrectHashtag) {
    // messageOnHashtagError = 'хэштег должен начинаться с символа # (решётка) и состоять из букв и цифр без пробелов; ' +
    //   'максимальная длина одного хэштега 20 символов, включая решётку; ' +
    //   'хэштеги разделяются пробелами';
    return false;
  }
  // один и тот же хэштег не может быть использован дважды
  if (hashtagsArray.length !== Array.from(new Set(hashtagsArray)).length) {
    isCorrectHashtag = false;
  }
  if (!isCorrectHashtag) {
  // messageOnHashtagError = 'хэштэги не должны повторяться';
    return false;
  }
  // нельзя указать больше пяти хэштегов
  if (hashtagsArray.length > 5) {
    isCorrectHashtag = false;
  }
  if (!isCorrectHashtag) {
  // messageOnHashtagError = 'нельзя задать больше 5 хэштэгов';
    return false;
  }
  return true;
}

function validateDescription (value) {
  return value.length <= 140;
}

function pristineValidate (evt) {
  evt.preventDefault();
  pristine.validate();
}

function onScaleControl (evt) {
  if (evt.target.matches('.scale__control--smaller')) {
    scaleControlValueInPercents = Math.max(scalePercentsMin, scaleControlValueInPercents - scalePercentsStep);
  } else {
    scaleControlValueInPercents = Math.min(scalePercentsMax, scaleControlValueInPercents + scalePercentsStep);
  }
  scaleControlValue.value = `${scaleControlValueInPercents}%`;
  imgUploadPreviewImg.style.transform = `scale(${scaleControlValueInPercents / 100})`;
}

function onSliderUpdate () {
  effectLevelValue.value = effectLevelSlider.noUiSlider.get();
  imgUploadPreviewImg.style.filter = `${effectData.filter}(${effectLevelValue.value}${effectData.unit})`;
}

function setOriginalPicture () {
  //скрываем слайдер и его контейнер
  imgUploadEffectLevel.classList.add('hidden');
  effectLevelSlider.classList.add('hidden');
  imgUploadPreviewImg.style.filter = ''; //убираем фильтр изображения
}

function onEffectsList (evt) {
  effectValue = evt.target.closest('.effects__item').querySelector('input').value;
  if (effectValue === 'none') {
    //оригинальное изображение
    setOriginalPicture();
  } else {
    effectData = effectsArray.find((item) => item.value === effectValue); //поиск в массиве объектов
    //imgUploadPreviewImg.style.filter = `${effectData.filter}(${effectData.max}${effectData.unit})`;
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: effectData.min,
        max: effectData.max,
      },
      start: effectData.max,
      step: effectData.step
    });
    //открываем слайдер и его контейнер
    imgUploadEffectLevel.classList.remove('hidden');
    effectLevelSlider.classList.remove('hidden');
  }
}

function closeForm () {
  imgUploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  //сбросить значение img-upload__input
  imgUploadInput.value = '';
  document.removeEventListener('keydown', onDocumentKeydown);
  effectLevelSlider.noUiSlider.destroy();
  imgUploadPreviewImg.style.transform = 'scale(1)';
  scaleControlValueInPercents = 100;
  messageOnHashtagError = null;
  messageOnDescriptionError = null;
  //pristine.destroy();
  //pristine.reset();
  imgUploadForm.reset();
}

function onDocumentKeydown (evt) {
  if (evt.key === 'Escape' && document.activeElement !== textHashtags && document.activeElement !== textDescription) {
    evt.preventDefault();
    closeForm();
  }
}

function loadingPictureForm () {
  imgUploadInput.addEventListener('change', onSelectPicture);
}

export{loadingPictureForm};
