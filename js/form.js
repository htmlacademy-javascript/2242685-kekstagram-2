const scalePercentsMin = 25;
const scalePercentsMax = 100;
const scalePercentsStep = 25;
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const bodyElement = document.querySelector('body');
const scaleControlValue = document.querySelector('.scale__control--value');
//let scaleControlValueInPercents = Number(scaleControlValue.value.replace('%',''));
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

const effectsArray = [
  {value: 'none', filter: ''},
  {value: 'chrome', filter: 'grayscale', unit: '', min: 0, max: 1, step: 0.1},
  {value: 'sepia', filter: 'sepia', unit: '', min: 0, max: 1, step: 0.1},
  {value: 'marvin', filter: 'invert', unit: '%', min: 0, max: 100, step: 1},
  {value: 'phobos', filter: 'blur', unit: 'px', min: 0, max: 3, step: 0.1},
  {value: 'heat', filter: 'brightness', unit: '', min: 1, max: 3, step: 0.1}
];

const pristine = new Pristine(imgUploadForm, {
  // определить классы
  // classTo: 'setup-wizard-form__element',
  // errorTextParent: 'setup-wizard-form__element',
  // errorTextClass: 'setup-wizard-form__error-text',

});

function onSelectPicture () {
  scaleControlSmaller.addEventListener('click', onScaleControl);
  scaleControlBigger.addEventListener('click', onScaleControl);
  //console.log(imgUploadInput.value);

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

  imgUploadForm.addEventListener('submit', pristineValidate);
  pristine.addValidator(imgUploadForm.querySelector('.text__hashtags'), validateHashtags, 'Хэштег неверный!');
  pristine.addValidator(imgUploadForm.querySelector('.text__description'), validateDescription, 'Комментарий неверный!');

  imgUploadOverlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
}

function validateHashtags (value) {
  //return value.length >= 2 && value.length <= 50;
}

function validateDescription (value) {
  //...
}

function pristineValidate (evt) {
  evt.preventDefault();
  //...
  return pristine.validate();
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
  //imgUploadInput.removeEventListener('change', onSelectImg);
  imgUploadInput.value = '';
  document.removeEventListener('keydown', onDocumentKeydown);
  effectLevelSlider.noUiSlider.destroy();
  imgUploadPreviewImg.style.transform = 'scale(1)';
  scaleControlValueInPercents = 100;
}

function onDocumentKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeForm();
  }
}

function loadingPictureForm () {
  imgUploadInput.addEventListener('change', onSelectPicture);
}

export{loadingPictureForm};
