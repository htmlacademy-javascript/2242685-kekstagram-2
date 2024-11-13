import {renderThumbnails} from './render-thumbnails.js';
import {debounce} from './utils.js';

const DISPLAYED_PHOTOS_COUNT = 10;
const imgFilters = document.querySelector('.img-filters');
const imgFiltersForm = imgFilters.querySelector('.img-filters__form');
const debounceRendering = debounce(renderThumbnails);

function showFilters (photosData) {
  imgFilters.classList.remove('img-filters--inactive');
  imgFiltersForm.addEventListener('click', (evt) => {
    if (!evt.target.matches('.img-filters__button')) { // если клик не на кнопке
      return;
    }
    const targetButton = evt.target;
    const activeButton = imgFiltersForm.querySelector('.img-filters__button--active');
    if (targetButton === activeButton) {
      return;
    }
    targetButton.classList.toggle('img-filters__button--active');
    activeButton.classList.toggle('img-filters__button--active');

    const targetFilterID = targetButton.getAttribute('id');
    let resultPhotoData = [];
    switch (targetFilterID) {
      case 'filter-default':
        resultPhotoData = photosData;
        break;
      case 'filter-random':
        resultPhotoData = photosData.toSorted(() => 0.5 - Math.random()).slice(0, DISPLAYED_PHOTOS_COUNT);
        break;
      case 'filter-discussed':
        resultPhotoData = photosData.toSorted((a, b) => b.comments.length - a.comments.length);
    }
    debounceRendering(resultPhotoData);
  });
}

export {showFilters};
