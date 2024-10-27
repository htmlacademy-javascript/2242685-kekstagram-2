import {getPhotosData} from './data.js';
import {thumbnailsRendering} from './thumbnails-rendering.js';
import {onThumbnailClick} from './big-pictures-rendering.js';

const photosData = getPhotosData();
//console.log(photosData);

thumbnailsRendering(photosData);

document.querySelector('.pictures').addEventListener("click", event => onThumbnailClick(event, photosData));
