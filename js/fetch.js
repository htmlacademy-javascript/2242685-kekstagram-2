import {thumbnailsRendering} from './thumbnails-rendering.js';
import {bigPicturesRendering} from './big-pictures-rendering.js';
import {closeForm, onFormKeydown} from './form.js';

const URL_TO_GET = 'https://31.javascript.htmlacademy.pro/kekstagram/data';
const URL_TO_POST = 'https://31.javascript.htmlacademy.pro/kekstagram';
const bodyElement = document.querySelector('body');
const submitButton = document.querySelector('#upload-submit');
const submitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};
let result = '';

function getPhotosData () {
  // 4.1. Загрузка изображений от других пользователей производится сразу после открытия страницы
  // с удалённого сервера: https://31.javascript.htmlacademy.pro/kekstagram/data.
  fetch(URL_TO_GET)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data) => {
      thumbnailsRendering(data);
      bigPicturesRendering(data);
    })
    .catch(() => {
      onGetDataError();
    });
}

function onGetDataError() {
  // 4.2. Если при загрузке данных с сервера произошла ошибка запроса, нужно показать соответствующее сообщение.
  // Разметку сообщения, которая находится в блоке #data-error внутри шаблона template, нужно разместить перед закрывающим тегом </body>.
  const dataErrorTemplate = document.querySelector('#data-error').content;
  const dataErrorFragment = dataErrorTemplate.cloneNode(true);
  bodyElement.append(dataErrorFragment);
  //Сообщение удаляется со страницы через 5 секунд.
  setTimeout(() => {
    bodyElement.querySelector('.data-error').remove();
  }, 5000);
}

function blockSubmitButton () {
  submitButton.disabled = true;
  submitButton.textContent = submitButtonText.SENDING;
}

function unblockSubmitButton () {
  submitButton.disabled = false;
  submitButton.textContent = submitButtonText.IDLE;
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
    // добавить обработчик Escape для формы
    document.addEventListener('keydown', onFormKeydown);
  }
  document.removeEventListener('click', onMessageWindowClick);
  bodyElement.querySelector(`.${result}`).remove();

}

export {getPhotosData, postPhotoData};
