import {onScaleControl, onSliderUpdate, createSlider, effectLevelSlider, setOriginalPicture, onEffectsList, imgUploadPreviewImg, resetScaleControlValue} from './form-picture.js';
import {pristineAddValidators, pristine, resetHashtagErrorMessages} from './form-texts.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const bodyElement = document.querySelector('body');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const effectsList = document.querySelector('.effects__list');
const imgUploadCancel = document.querySelector('.img-upload__cancel');

function loadingPictureForm () {
  imgUploadInput.addEventListener('change', onSelectPicture);
}

function onSelectPicture () {
  scaleControlSmaller.addEventListener('click', onScaleControl);
  scaleControlBigger.addEventListener('click', onScaleControl);

  createSlider();
  effectLevelSlider.noUiSlider.on('update', onSliderUpdate);

  setOriginalPicture();

  effectsList.addEventListener('click', onEffectsList);
  document.addEventListener('keydown', onDocumentKeydown);
  imgUploadCancel.addEventListener('click', closeForm);
  //pristine
  imgUploadForm.addEventListener('submit', pristineValidate);
  pristineAddValidators();

  imgUploadOverlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
}

function pristineValidate (evt) {
  evt.preventDefault();
  pristine.validate();
}

function closeForm () {
  imgUploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  //сбросить значение img-upload__input
  imgUploadInput.value = '';
  document.removeEventListener('keydown', onDocumentKeydown);
  effectLevelSlider.noUiSlider.destroy();
  imgUploadPreviewImg.style.transform = 'scale(1)';
  resetScaleControlValue();
  resetHashtagErrorMessages();
  //pristine.destroy();
  //pristine.reset();
  imgUploadForm.reset();
}

function onDocumentKeydown (evt) {
  if (evt.key === 'Escape' && document.activeElement !== imgUploadForm.querySelector('.text__hashtags') && document.activeElement !== imgUploadForm.querySelector('.text__description')) {
    evt.preventDefault();
    closeForm();
  }
}

export {loadingPictureForm};
