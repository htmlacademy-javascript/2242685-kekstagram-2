const picturesContainer = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img').querySelector('img');
const likesCount = document.querySelector('.likes-count');
//const socialCommentShownCount = document.querySelector('.social__comment-shown-count');
const socialCommentTotalCount =  document.querySelector('.social__comment-total-count');



//обработчик клика на миниатюре
{/* <a href="#" class="picture">
<img class="picture__img" src="" width="182" height="182" alt="Случайная фотография">
<p class="picture__info">
  <span class="picture__comments"></span>
  <span class="picture__likes"></span>
</p>
</a> */}

function onThumbnailClick(evt) {
  if (evt.target.matches('.picture')) { //если клик на миниатюре
    //selectedCategoryContainer.textContent = evt.target.value;
    bigPicture.classList.remove('hidden'); //отображаем модальное окно для вывода полноразмерной фотографии
    //наполнение окна
    const pictureImg = evt.target.querySelector('img');
    bigPictureImg.src = pictureImg.src;
    const pictureLikes = evt.target.querySelector('.picture__likes');
    likesCount.textContent = pictureLikes.textContent;
    //socialCommentShownCount.textContent =
    const pictureCommentsCount = evt.target.querySelector('.picture__likes');
    socialCommentTotalCount.textContent = pictureCommentsCount.textContent;

    //обработчики для элементов модального окна

  }
}

picturesContainer.addEventListener('click', onThumbnailClick);
