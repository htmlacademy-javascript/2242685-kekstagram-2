const SCALE_PERCENTS_MIN = 25;
const SCALE_PERCENTS_MAX = 100;
const SCALE_PERCENTS_STEP = 25;
const Effects = [
  {value: 'none', filter: ''},
  {value: 'chrome', filter: 'grayscale', unit: '', min: 0, max: 1, step: 0.1},
  {value: 'sepia', filter: 'sepia', unit: '', min: 0, max: 1, step: 0.1},
  {value: 'marvin', filter: 'invert', unit: '%', min: 0, max: 100, step: 1},
  {value: 'phobos', filter: 'blur', unit: 'px', min: 0, max: 3, step: 0.1},
  {value: 'heat', filter: 'brightness', unit: '', min: 1, max: 3, step: 0.1}
];
const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadPreviewImg = document.querySelector('.img-upload__preview').querySelector('img');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level'); //контейнер слайдера
let scaleControlValueInPercents = 100;
let effectValue = '';
let effectData = {};

function onScaleControlSmaller () {
  scaleControlValueInPercents = Math.max(SCALE_PERCENTS_MIN, scaleControlValueInPercents - SCALE_PERCENTS_STEP);
  setScaleControlValue();
}

function onScaleControlBigger () {
  scaleControlValueInPercents = Math.min(SCALE_PERCENTS_MAX, scaleControlValueInPercents + SCALE_PERCENTS_STEP);
  setScaleControlValue();
}

function setScaleControlValue () {
  scaleControlValue.value = `${scaleControlValueInPercents}%`;
  imgUploadPreviewImg.style.transform = `scale(${scaleControlValueInPercents / 100})`;
}

function onSliderUpdate () {
  effectLevelValue.value = 1 * effectLevelSlider.noUiSlider.get();
  imgUploadPreviewImg.style.filter = `${effectData.filter}(${effectLevelValue.value}${effectData.unit})`;
}

function createSlider () {
  if (!effectLevelSlider.noUiSlider) {
    noUiSlider.create(effectLevelSlider, {
      range: {
        min: 0,
        max: 1,
      },
      start: 1, //100%
      step: 0.1,
      connect: 'lower',
    });
  }
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
    setOriginalPicture(); //оригинальное изображение
  } else {
    effectData = Effects.find((item) => item.value === effectValue); //поиск в массиве объектов
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: effectData.min,
        max: effectData.max,
      },
      start: effectData.max,
      step: effectData.step
    });
    //отображаем слайдер и его контейнер
    imgUploadEffectLevel.classList.remove('hidden');
    effectLevelSlider.classList.remove('hidden');
  }
}

function resetScaleControlValue () {
  scaleControlValueInPercents = 100;
}

export {onScaleControlSmaller, onScaleControlBigger, onSliderUpdate, createSlider, effectLevelSlider, setOriginalPicture, onEffectsList, imgUploadPreviewImg, resetScaleControlValue};
