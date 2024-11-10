import {onScaleControlSmaller, onScaleControlBigger, onSliderUpdate, createSlider, effectLevelSlider, setOriginalPicture, onEffectsList, imgUploadPreviewImg, resetScaleControlValue} from './form-picture.js';
import {createPristine, pristine, pristineAddValidators} from './form-texts.js';
import {postPhotoData} from './fetch.js';

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
  scaleControlSmaller.addEventListener('click', onScaleControlSmaller);
  scaleControlBigger.addEventListener('click', onScaleControlBigger);

  createSlider();
  effectLevelSlider.noUiSlider.on('update', onSliderUpdate);

  setOriginalPicture();

  effectsList.addEventListener('click', onEffectsList);
  document.addEventListener('keydown', onFormKeydown);
  imgUploadCancel.addEventListener('click', closeForm);

  createPristine();
  imgUploadForm.addEventListener('submit', onFormSubmit);
  pristineAddValidators();

  imgUploadOverlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
}

function closeForm () {
  imgUploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  //сбросить значение img-upload__input
  imgUploadInput.value = '';
  document.removeEventListener('keydown', onFormKeydown);
  effectLevelSlider.noUiSlider.destroy();
  imgUploadPreviewImg.style.transform = 'scale(1)';
  resetScaleControlValue();
  pristine.destroy();
  imgUploadForm.reset();
}

function onFormKeydown (evt) {
  if (evt.key === 'Escape' && document.activeElement !== imgUploadForm.querySelector('.text__hashtags') && document.activeElement !== imgUploadForm.querySelector('.text__description')) {
    evt.preventDefault();
    closeForm();
  }
}

function onFormSubmit (evt) {
  evt.preventDefault();
  if (pristine.validate()) {
    postPhotoData(evt);
  }
}

export {loadingPictureForm, closeForm, onFormKeydown};