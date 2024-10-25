
function onThumbnailClick (evt, photosData) {

  if (evt.target.matches('.picture__img')) { //если клик на миниатюре
    const pictureImg = evt.target;
//    console.log(pictureImg);
    const pictureLink = pictureImg.closest('.picture'); //родительский элемент (ссылка)
    const pictureCommentsCount = pictureLink.querySelector('.picture__comments');
    const pictureLikes = pictureLink.querySelector('.picture__likes');
    const photoId = pictureLink.id;

    const bigPicture = document.querySelector('.big-picture');
    const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
    const likesCount = bigPicture.querySelector('.likes-count');
    //const socialCommentShownCount = document.querySelector('.social__comment-shown-count');
    const socialCommentTotalCount = bigPicture.querySelector('.social__comment-total-count');
    const socialCaption = bigPicture.querySelector('.social__caption');

    bigPicture.classList.remove('hidden'); //отображаем модальное окно для вывода полноразмерной фотографии (может в конец?)

    //наполнение окна
    bigPictureImg.src = pictureImg.src;
    bigPictureImg.alt = pictureImg.alt;
    socialCaption.textContent = pictureImg.alt;
    likesCount.textContent = pictureLikes.textContent;
    //socialCommentShownCount.textContent =
    socialCommentTotalCount.textContent = pictureCommentsCount.textContent;

    //блок комментариев
    // <li class="social__comment">
    //   <img
    //     class="social__picture"
    //     src="{{аватар}}"
    //     alt="{{имя комментатора}}"
    //     width="35" height="35">
    //   <p class="social__text">{{текст комментария}}</p>
    // </li>

    //photosData[photoId] - соответствующий фотографии элемент массива
    //.social__comments - родительский класс
    const socialComments = bigPicture.querySelector('.social__comments');
    socialComments.replaceChildren(); //удаляем все комментарии
    const commentsFragment = document.createDocumentFragment();
    console.log(photosData[photoId].comments);
    photosData[photoId].comments.forEach((comment) => {

      const socialComment = document.createElement('li');
      socialComment.classList.add('social__comment');
      //console.log(comment);
      const socialPicture = document.createElement('img');
      socialPicture.classList.add('social__picture');
      socialPicture.src = comment.avatar;
      socialPicture.alt = comment.name;
      socialPicture.style.width = "35";
      socialPicture.style.height = "35";

      const socialText = document.createElement('p');
      socialText.classList.add('social__text');
      socialText.textContent = comment.message;

      socialComment.append(socialPicture, socialText);
      socialComments.append(socialComment);
    })
    commentsFragment.append(socialComments);

    //обработчики для элементов модального окна

  }
}

//picturesContainer.addEventListener('click', onThumbnailClick);
export {onThumbnailClick};
