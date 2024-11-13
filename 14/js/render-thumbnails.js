
function renderThumbnails (photosData) {
  const picturesContainer = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content;
  const picturesFragment = document.createDocumentFragment();
  // удаление всех предыдущих фотографий
  picturesContainer.querySelectorAll('.picture').forEach((element) => element.remove());

  photosData.forEach((photoData) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    const pictureLink = pictureElement.querySelector('.picture'); //ссылка (тег <a ...)
    pictureLink.id = photoData.id;
    const pictureImg = pictureElement.querySelector('img');
    pictureImg.src = photoData.url;
    pictureImg.alt = photoData.description;
    const pictureComments = pictureElement.querySelector('.picture__comments');
    pictureComments.textContent = photoData.comments.length;
    const pictureLikes = pictureElement.querySelector('.picture__likes');
    pictureLikes.textContent = photoData.likes;

    picturesFragment.append(pictureElement);
  });

  picturesContainer.append(picturesFragment);
}

export {renderThumbnails};
