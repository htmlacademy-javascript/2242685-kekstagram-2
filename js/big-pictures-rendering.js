//const picturesContainer = document.querySelector('.pictures');
function onThumbnailClick (evt) {
  {/* <a href="#" class="picture">
  <img class="picture__img" src="" width="182" height="182" alt="Случайная фотография">
  <p class="picture__info">
    <span class="picture__comments"></span>
    <span class="picture__likes"></span>
  </p>
  </a> */}
  //console.log(evt.target);
  if (evt.target.matches('.picture__img')) { //если клик на миниатюре
    const thumbnailImg = evt.target;
    const thumbnail = thumbnailImg.closest('.picture'); //родительский элемент (миниатюра)
    const pictureCommentsCount = thumbnail.querySelector('.picture__comments');
    const pictureLikes = thumbnail.querySelector('.picture__likes');

    const bigPicture = document.querySelector('.big-picture');
    const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
    const likesCount = bigPicture.querySelector('.likes-count');
    //const socialCommentShownCount = document.querySelector('.social__comment-shown-count');
    const socialCommentTotalCount = bigPicture.querySelector('.social__comment-total-count');
    const socialCaption = bigPicture.querySelector('.social__caption');

    bigPicture.classList.remove('hidden'); //отображаем модальное окно для вывода полноразмерной фотографии (может в конец?)

    //наполнение окна
    bigPictureImg.src = thumbnailImg.src;
    bigPictureImg.alt = thumbnailImg.alt;
    socialCaption.textContent = thumbnailImg.alt;
    likesCount.textContent = pictureLikes.textContent;
    //socialCommentShownCount.textContent =
    socialCommentTotalCount.textContent = pictureCommentsCount.textContent;

    //обработчики для элементов модального окна

  }
}

//picturesContainer.addEventListener('click', onThumbnailClick);
export {onThumbnailClick};
