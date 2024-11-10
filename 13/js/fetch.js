import {thumbnailsRendering} from './thumbnails-rendering.js';
import {bigPicturesRendering} from './big-pictures-rendering.js';
import {closeForm, onFormKeydown} from './form.js';
import {showFilters} from './filters.js';

const URL_TO_GET = 'https://31.javascript.htmlacademy.pro/kekstagram/data';
const URL_TO_POST = 'https://31.javascript.htmlacademy.pro/kekstagram';
const SHOW_ERROR_TIME = 5000;
const bodyElement = document.querySelector('body');
const submitButton = document.querySelector('#upload-submit');
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};
let result = '';

function getPhotosData () {
  fetch(URL_TO_GET)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data) => {
      const photosData = data.slice();
      thumbnailsRendering(photosData);
      showFilters(photosData);
      bigPicturesRendering(photosData);
    })
    .catch(() => {
      onGetDataError();
    });
}

function onGetDataError() {
  const dataErrorTemplate = document.querySelector('#data-error').content;
  const dataErrorFragment = dataErrorTemplate.cloneNode(true);
  bodyElement.append(dataErrorFragment);
  setTimeout(() => {
    bodyElement.querySelector('.data-error').remove();
  }, SHOW_ERROR_TIME);
}

function blockSubmitButton () {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
}

function unblockSubmitButton () {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
}

function postPhotoData(evt) {
  const formData = new FormData(evt.target);
  blockSubmitButton();
  fetch(
    URL_TO_POST,
    {
      method: 'POST',
      body: formData,
    }
  )
    .then((response) => {
      if (response.ok) {
        return;
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then(() => {
      closeForm();
      result = 'success';
      onPostData();
    })
    .catch(() => {
      result = 'error';
      onPostData();
    })
    .finally(unblockSubmitButton);
}

function onPostData() {
  const messageTemplate = document.querySelector(`#${result}`).content;
  const messageFragment = messageTemplate.cloneNode(true);
  bodyElement.append(messageFragment);
  // удалить обработчик Escape для формы
  // заменить на stopPropagation()?
  document.removeEventListener('keydown', onFormKeydown);
  document.addEventListener('keydown', onMessageWindowKeydown);
  document.addEventListener('click', onMessageWindowClick);
}

function onMessageWindowClick (evt) {
  if (evt.target.matches(`.${result}`) || evt.target.matches(`.${result}__button`)) {
    closeMessageWindow();
  }
}

function onMessageWindowKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeMessageWindow();
  }
}

function closeMessageWindow () {
  document.removeEventListener('keydown', onMessageWindowKeydown);
  if (result === 'error') {
  // заменить на stopPropagation() (в onPostData ?) и удалить блок с условием
  // добавить обработчик Escape для формы
    document.addEventListener('keydown', onFormKeydown);
  }
  document.removeEventListener('click', onMessageWindowClick);
  bodyElement.querySelector(`.${result}`).remove();

}

export {getPhotosData, postPhotoData};
