import {getPhotosData} from './data.js';
import {thumbnailsRendering} from './thumbnails-rendering.js';
import {onThumbnailClick} from './big-pictures-rendering.js';

const photosData = getPhotosData();

// var someVar = (function(){
//        //...
//        return result;
//     }());

thumbnailsRendering(photosData);

//document.querySelector('.pictures').addEventListener('click', onThumbnailClick);
//document.querySelector('.pictures').addEventListener("click", onThumbnailClick(photosData));
document.querySelector('.pictures').addEventListener("click", event => onThumbnailClick(event, photosData));
