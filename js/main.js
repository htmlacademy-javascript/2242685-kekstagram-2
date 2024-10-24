import {getPhotosData} from './data.js';
import {thumbnailsRendering} from './thumbnails-rendering.js';
import {onThumbnailClick} from './big-pictures-rendering.js';

thumbnailsRendering(getPhotosData());

document.querySelector('.pictures').addEventListener('click', onThumbnailClick);
