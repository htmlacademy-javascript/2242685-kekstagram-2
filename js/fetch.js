import {thumbnailsRendering} from './thumbnails-rendering.js';
import {bigPicturesRendering} from './big-pictures-rendering.js';
import {closeForm, onFormKeydown} from './form.js';

const URL = 'https://31.javascript.htmlacademy.pro/kekstagram/data';
const bodyElement = document.querySelector('body');
const submitButton = document.querySelector('#upload-submit');
const submitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

function getPhotosData () {
  // 4.1. Загрузка изображений от других пользователей производится сразу после открытия страницы
  // с удалённого сервера: https://31.javascript.htmlacademy.pro/kekstagram/data.
  fetch(URL)
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
    'https://31.javascript.htmlacadem.pro/kekstagram',
    {
      method: 'POST',
      body: formData,
    }
  )
    .then(() => {
      closeForm();
      onPostDataSuccess();
    })
    .catch(() => {
      onPostDataError();
    })
    .finally(unblockSubmitButton);
}

function onPostDataSuccess() {
  // 3.4. Если отправка данных прошла успешно, показывается соответствующее сообщение.
  // Разметку сообщения, которая находится в блоке #success внутри шаблона template, нужно разместить перед закрывающим тегом </body>.
  // Сообщение должно удаляться со страницы после нажатия на кнопку .success__button,
  //  по нажатию на клавишу Esc и по клику на произвольную область экрана за пределами блока с сообщением.

  const dataSuccessTemplate = document.querySelector('#success').content;
  const dataSuccessFragment = dataSuccessTemplate.cloneNode(true);
  bodyElement.append(dataSuccessFragment);
  const successButton = bodyElement.querySelector('.success__button');
  successButton.addEventListener('click', closeSuccessWindow);
  document.addEventListener('keydown', onDocumentKeydownSuccess);
  document.addEventListener('click', onDocumentClickSuccess);
}

function onDocumentClickSuccess (evt) {
  if (evt.target.matches('.success')) { //если клик не на окне сообщения
    closeSuccessWindow();
  }
}

function onDocumentKeydownSuccess (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeSuccessWindow();
  }
}

function closeSuccessWindow () {
  document.removeEventListener('keydown', onDocumentKeydownSuccess);
  document.removeEventListener('click', onDocumentClickSuccess);
  bodyElement.querySelector('.success').remove();
}

function onPostDataError() {
  // 3.5. Если при отправке данных произошла ошибка запроса, нужно показать соответствующее сообщение.
  // Разметку сообщения, которая находится в блоке #error внутри шаблона template, нужно разместить перед закрывающим тегом </body>.
  // Сообщение должно удаляться со страницы после нажатия на кнопку .error__button,
  //  по нажатию на клавишу Esc и по клику на произвольную область экрана за пределами блока с сообщением.
  // В таком случае вся введённая пользователем информация сохраняется, чтобы у него была возможность отправить форму повторно.

  const dataErrorTemplate = document.querySelector('#error').content;
  const dataErrorFragment = dataErrorTemplate.cloneNode(true);
  bodyElement.append(dataErrorFragment);
  const errorButton = bodyElement.querySelector('.error__button');
  errorButton.addEventListener('click', closeErrorWindow);
  // удалить обработчик Escape для формы
  document.removeEventListener('keydown', onFormKeydown);
  document.addEventListener('keydown', onDocumentKeydownError);
  document.addEventListener('click', onDocumentClickError);

}

function onDocumentKeydownError (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeErrorWindow();
  }
}

function onDocumentClickError (evt) {
  if (evt.target.matches('.error')) { //если клик не на окне сообщения
    closeErrorWindow();
  }
}

function closeErrorWindow () {
  document.removeEventListener('keydown', onDocumentKeydownError);
  // добавить обработчик Escape для формы
  document.addEventListener('keydown', onFormKeydown);
  document.removeEventListener('click', onDocumentClickError);
  bodyElement.querySelector('.error').remove();
}

export {getPhotosData, postPhotoData};
