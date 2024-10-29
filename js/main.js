import {getPhotosData} from './data.js';
import {thumbnailsRendering} from './thumbnails-rendering.js';
import {bigPicturesRendering} from './big-pictures-rendering.js';

const photosData = getPhotosData();

thumbnailsRendering(photosData);

bigPicturesRendering(photosData);
