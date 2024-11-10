/*
<a href="#" class="picture">
<img class="picture__img" src="" width="182" height="182" alt="Случайная фотография">
<p class="picture__info">
  <span class="picture__comments"></span>
  <span class="picture__likes"></span>
</p>
</a>
*/

import {getPhotosData} from './data.js';
const photosData = getPhotosData();

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const picturesFragment = document.createDocumentFragment();

for (let i = 0; i < photosData.length; i++) {
  const pictureElement = pictureTemplate.cloneNode(true);

  const pictureImg = pictureElement.querySelector('img');
  pictureImg.src = photosData[i].url;
  pictureImg.alt = photosData[i].description;
  const pictureComments = pictureElement.querySelector('.picture__comments');
  pictureComments.textContent = photosData[i].comments.length;
  const pictureLikes = pictureElement.querySelector('.picture__likes');
  pictureLikes.textContent = photosData[i].likes;

  picturesFragment.append(pictureElement);
}

picturesContainer.append(picturesFragment);