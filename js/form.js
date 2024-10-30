const percentsMin = 25;
const percentsMax = 100;
const percentsStep = 25;
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const bodyElement = document.querySelector('body');
const scaleControlValue = document.querySelector('.scale__control--value');
let scaleControlValueInPercents = Number(scaleControlValue.value.replace('%',''));
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const imgUploadPreviewImg = document.querySelector('.img-upload__preview').querySelector('img');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level'); //контейнер слайдера
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectsList = document.querySelector('.effects__list');
let effectValue = '';
let effectData = {};
// Для эффекта «Хром» — filter: grayscale(0..1) с шагом 0.1;
// Для эффекта «Сепия» — filter: sepia(0..1) с шагом 0.1;
// Для эффекта «Марвин» — filter: invert(0..100%) с шагом 1%;
// Для эффекта «Фобос» — filter: blur(0..3px) с шагом 0.1px;
// Для эффекта «Зной» — filter: brightness(1..3) с шагом 0.1;
// Для эффекта «Оригинал» CSS-стили filter удаляются.
const effectsArray = [
  {value: 'none', filter: ''},
  {value: 'chrome', filter: 'grayscale', unit: '', min: 0, max: 1, step: 0.1},
  {value: 'sepia', filter: 'sepia', unit: '', min: 0, max: 1, step: 0.1},
  {value: 'marvin', filter: 'invert', unit: '%', min: 0, max: 100, step: 1},
  {value: 'phobos', filter: 'blur', unit: 'px', min: 0, max: 3, step: 0.1},
  {value: 'heat', filter: 'brightness', unit: '', min: 1, max: 3, step: 0.1}
];

function onSelectImg() {
  imgUploadOverlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
}

function onScaleControl (evt) {
  if (evt.target.matches('.scale__control--smaller')) {
    scaleControlValueInPercents = Math.max(percentsMin, scaleControlValueInPercents - percentsStep);
  } else {
    scaleControlValueInPercents = Math.min(percentsMax, scaleControlValueInPercents + percentsStep);
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

function loadingPictureForm () {
  imgUploadInput.addEventListener('change', onSelectImg);
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

}

export{loadingPictureForm};
