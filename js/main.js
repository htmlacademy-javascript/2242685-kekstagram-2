// import {getPhotosData} from './data.js';
import {thumbnailsRendering} from './thumbnails-rendering.js';
import {bigPicturesRendering} from './big-pictures-rendering.js';
import {loadingPictureForm} from './form.js';
import {fetchPhotosData} from './fetch.js';

// const photosData = getPhotosData();
const photosData = fetchPhotosData();

thumbnailsRendering(photosData);

bigPicturesRendering(photosData);

loadingPictureForm();
