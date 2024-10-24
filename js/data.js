import {getRandomInteger} from './utils.js';

const NUMBER_OF_PHOTOS = 25;
const PHOTOS_DESCRIPTIONS = [ // описание фотографии (придумайте самостоятельно)
  'Галечный пляж отеля',
  'Указатель на пляж',
  'Камни, песчаный пляж',
  'Девушка, фотоаппарат, песчаный пляж',
  'Смешной супчик',
  'Чёрный спортивный автомобиль',
  'Клубничка',
  'Компот',
  'Самолёт над пляжем',
  'Обувь',
  'Вход на пляж',
  'Белая Audi',
  'Форель?',
  'Бедный котик',
  'Отключили отопление',
  'Фото из иллюминатора самолёта',
  'Хор',
  'Старый красный автомобиль',
  'Тапочки с фонариками',
  'Пальмы',
  'Салат',
  'Закат на море',
  'Краб',
  'Рок-концерт',
  'Внедорожник и бегемоты'
];

const NAMES = [ // Набор имён для комментаторов составьте сами
  'Сергей',
  'Екатерина',
  'Юрий',
  'Надежда',
  'Иван',
  'Тимофей',
  'Софья',
  'Владимир',
  'Валентина',
  'Мария',
  'Нина',
  'Степан',
  'Григорий',
  'Михаил'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!'
];


function getMessage () { // одно или два случайных предложения из представленных
  const messagesCount = getRandomInteger(1, 2); // одно или два
  let message = '';
  for (let k = 1; k <= messagesCount; k++) {
    message += ((k > 1) ? ' ' : '') + MESSAGES[getRandomInteger(0, MESSAGES.length - 1)]; // перед вторым предложением добавляем пробел
  }
  return message;
}

function getComments () {
  const commentsCount = getRandomInteger (0, 30); // Количество комментариев к каждой фотографии — случайное число от 0 до 30.
  const commentsArray = [];
  for (let j = 0; j <= commentsCount - 1; j++) {
    commentsArray[j] = {
      id: j + 1, // любое число. Идентификаторы не должны повторяться.
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`, // img/avatar-{{случайное число от 1 до 6}}.svg
      message: getMessage(),
      name: NAMES[getRandomInteger(0, NAMES.length - 1)],
    };
  }
  return commentsArray;
}

function getPhotosData() {
  const photosData = [];
  for (let i = 1; i <= NUMBER_OF_PHOTOS; i++) {
    photosData[i - 1] = {
      id: i, // уникальный идентификатор фотографии (от 1 до NUMBER_OF_PHOTOS)
      url: `photos/${i}.jpg`, // адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.
      description: PHOTOS_DESCRIPTIONS[i - 1],
      likes: getRandomInteger(15, 200), // количество лайков, поставленных фотографии. Случайное число от 15 до 200.
      comments: getComments(),
    };
  }
  return photosData;
}

export {getPhotosData};
