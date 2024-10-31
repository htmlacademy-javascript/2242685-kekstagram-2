import {getPhotosData} from './data.js';
import {thumbnailsRendering} from './thumbnails-rendering.js';
import {bigPicturesRendering} from './big-pictures-rendering.js';
import{loadingPictureForm} from './form.js';

const photosData = getPhotosData();

thumbnailsRendering(photosData);

bigPicturesRendering(photosData);

loadingPictureForm();
