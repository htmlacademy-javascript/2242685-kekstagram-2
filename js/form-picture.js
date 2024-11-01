const scalePercentsMin = 25;
const scalePercentsMax = 100;
const scalePercentsStep = 25;
const scaleControlValue = document.querySelector('.scale__control--value');
let scaleControlValueInPercents = 100;
const imgUploadPreviewImg = document.querySelector('.img-upload__preview').querySelector('img');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level'); //контейнер слайдера
let effectValue = '';
let effectData = {};
const effectsArray = [
  {value: 'none', filter: ''},
  {value: 'chrome', filter: 'grayscale', unit: '', min: 0, max: 1, step: 0.1},
  {value: 'sepia', filter: 'sepia', unit: '', min: 0, max: 1, step: 0.1},
  {value: 'marvin', filter: 'invert', unit: '%', min: 0, max: 100, step: 1},
  {value: 'phobos', filter: 'blur', unit: 'px', min: 0, max: 3, step: 0.1},
  {value: 'heat', filter: 'brightness', unit: '', min: 1, max: 3, step: 0.1}
];


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

function createSlider () {
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

function resetScaleControlValue () {
  scaleControlValueInPercents = 100;
}

export {onScaleControl, onSliderUpdate, createSlider, effectLevelSlider, setOriginalPicture, onEffectsList, imgUploadPreviewImg, resetScaleControlValue};
