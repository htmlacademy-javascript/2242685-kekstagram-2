
const bigPicture = document.querySelector('.big-picture');

function closeBigPictureModal () {
  bigPicture.classList.add('hidden');
  bigPicture.querySelector('.social__comment-count').classList.remove('hidden');
  bigPicture.querySelector('.comments-loader').classList.remove('hidden');
  document.querySelector('body').classList.remove('modal-open');
}

function onDocumentKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPictureModal();
  }
};

function bigPicturesRendering (photosDataArray) {
  document.querySelector('.pictures').addEventListener("click", (evt) => {
    if (evt.target.matches('.picture__img')) { //если клик на миниатюре
      const pictureImg = evt.target;
      const pictureLink = pictureImg.closest('.picture'); //родительский элемент (ссылка)
      const pictureCommentsCount = pictureLink.querySelector('.picture__comments');
      const pictureLikes = pictureLink.querySelector('.picture__likes');
      const photoId = pictureLink.id;

      const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
      const likesCount = bigPicture.querySelector('.likes-count');
      //const socialCommentShownCount = document.querySelector('.social__comment-shown-count');
      const socialCommentTotalCount = bigPicture.querySelector('.social__comment-total-count');
      const socialCaption = bigPicture.querySelector('.social__caption');

      //наполнение окна
      bigPictureImg.src = pictureImg.src;
      bigPictureImg.alt = pictureImg.alt;
      socialCaption.textContent = pictureImg.alt;
      likesCount.textContent = pictureLikes.textContent;
      //socialCommentShownCount.textContent =
      socialCommentTotalCount.textContent = pictureCommentsCount.textContent;

      //блок комментариев
      //photosDataArray[photoId - 1] - соответствующий фотографии элемент массива
      //.social__comments - родительский класс
      const socialComments = bigPicture.querySelector('.social__comments');
      socialComments.replaceChildren(); //удаляем все комментарии
      const commentsFragment = document.createDocumentFragment();
      photosDataArray[photoId - 1].comments.forEach((comment) => {
        const socialComment = document.createElement('li');
        socialComment.classList.add('social__comment');
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
        commentsFragment.append(socialComment);
      })
      socialComments.append(commentsFragment);

      bigPicture.classList.remove('hidden'); //отображаем модальное окно для вывода полноразмерной фотографии (может в конец?)

      bigPicture.querySelector('.social__comment-count').classList.add('hidden');
      bigPicture.querySelector('.comments-loader').classList.add('hidden');
      document.querySelector('body').classList.add('modal-open');

      //обработчики для элементов модального окна
      const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel'); //кнопка закрытия окна
      bigPictureCancel.addEventListener('click', closeBigPictureModal);

      document.addEventListener('keydown', onDocumentKeydown);
    }
  })
}

export {bigPicturesRendering};
