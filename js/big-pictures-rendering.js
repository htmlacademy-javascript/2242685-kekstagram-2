const LOADING_COMMENTS_COUNT = 5; // количество загружаемых за раз комментариев

const bigPicture = document.querySelector('.big-picture');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentShownCount = bigPicture.querySelector('.social__comment-shown-count');
const commentsLoader = bigPicture.querySelector('.comments-loader'); //кнопка Загрузить ещё
let photoId = 0;
let commentsCount = 0;
let commentsLoaded = 0;
let comments = [];

function closeBigPictureModal () {
  bigPicture.classList.add('hidden');
  bigPicture.querySelector('.social__comment-count').classList.remove('hidden');
  bigPicture.querySelector('.comments-loader').classList.remove('hidden');
  document.querySelector('body').classList.remove('modal-open');
  commentsLoaded = 0;
  commentsCount = 0;
  //удалить обработчик Escape!
  document.removeEventListener('keydown', onBigPictureKeydown);
}

function onBigPictureKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPictureModal();
  }
}

function bigPicturesRendering (photosData) {
  document.querySelector('.pictures').addEventListener('click', (evt) => {
    if (evt.target.matches('.picture__img')) { //если клик на миниатюре
      document.querySelector('body').classList.add('modal-open');
      const pictureImg = evt.target;
      const pictureLink = pictureImg.closest('.picture'); //родительский элемент (ссылка)
      const pictureCommentsCount = pictureLink.querySelector('.picture__comments');
      const pictureLikes = pictureLink.querySelector('.picture__likes');
      photoId = pictureLink.id;

      const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
      const likesCount = bigPicture.querySelector('.likes-count');
      const socialCommentTotalCount = bigPicture.querySelector('.social__comment-total-count');
      const socialCaption = bigPicture.querySelector('.social__caption');

      //наполнение окна
      bigPictureImg.src = pictureImg.src;
      bigPictureImg.alt = pictureImg.alt;
      socialCaption.textContent = pictureImg.alt;
      likesCount.textContent = pictureLikes.textContent;
      socialCommentTotalCount.textContent = pictureCommentsCount.textContent;

      //блок комментариев
      //photosData[photoId] - соответствующий фотографии элемент массива
      //.social__comments - родительский класс
      socialComments.replaceChildren(); //удаляем все комментарии
      // comments = photosData[photoId - 1].comments;
      comments = photosData[photoId].comments;
      commentsCount = comments.length;
      commentsLoader.addEventListener('click', appendComments);

      //обработчики для кнопки закрытия модального окна
      const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel'); //кнопка закрытия окна
      bigPictureCancel.addEventListener('click', closeBigPictureModal);
      document.addEventListener('keydown', onBigPictureKeydown);
      appendComments(); //загружаем первую порцию комментариев
      bigPicture.classList.remove('hidden'); //отображаем модальное окно для вывода полноразмерной фотографии
    }
  });
}

function appendComments () {
  const commentsFragment = document.createDocumentFragment();
  const initialNumber = commentsLoaded + 1;
  const finalNumber = Math.min(commentsLoaded + LOADING_COMMENTS_COUNT, commentsCount);
  for (let i = initialNumber; i <= finalNumber; i++) {
    commentsLoaded++;
    const comment = comments[i - 1];
    const socialComment = document.createElement('li');
    socialComment.classList.add('social__comment');
    const socialPicture = document.createElement('img');
    socialPicture.classList.add('social__picture');
    socialPicture.src = comment.avatar;
    socialPicture.alt = comment.name;
    socialPicture.style.width = '35';
    socialPicture.style.height = '35';

    const socialText = document.createElement('p');
    socialText.classList.add('social__text');
    socialText.textContent = comment.message;
    socialComment.append(socialPicture, socialText);
    commentsFragment.append(socialComment);
  }
  socialComments.append(commentsFragment);
  socialCommentShownCount.textContent = commentsLoaded;
  if (commentsLoaded === commentsCount) {
    commentsLoader.classList.add('hidden');
  }
}

export {bigPicturesRendering};
