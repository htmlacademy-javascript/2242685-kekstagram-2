// 4.1. Загрузка изображений от других пользователей производится сразу после открытия страницы
// с удалённого сервера: https://31.javascript.htmlacademy.pro/kekstagram/data.
// 4.2. Если при загрузке данных с сервера произошла ошибка запроса, нужно показать соответствующее сообщение.
// Разметку сообщения, которая находится в блоке #data-error внутри шаблона template, нужно разместить перед закрывающим тегом </body>.
//Сообщение удаляется со страницы через 5 секунд.

import {thumbnailsRendering} from './thumbnails-rendering.js';
import {bigPicturesRendering} from './big-pictures-rendering.js';

const URL = 'https://31.javascript.htmlacademy.pro/kekstagram/data';

function fetchPhotosData () {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      thumbnailsRendering(data);
      bigPicturesRendering(data);
  });
}

export {fetchPhotosData};
