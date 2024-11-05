// 4.1. Загрузка изображений от других пользователей производится сразу после открытия страницы
// с удалённого сервера: https://31.javascript.htmlacademy.pro/kekstagram/data.
// 4.2. Если при загрузке данных с сервера произошла ошибка запроса, нужно показать соответствующее сообщение.
// Разметку сообщения, которая находится в блоке #data-error внутри шаблона template, нужно разместить перед закрывающим тегом </body>.
//Сообщение удаляется со страницы через 5 секунд.

async function fetchPhotosData () {
  //let photosData = [];
  // fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
  // .then((response) => response.json())
  // .then((data) => ...)
}

// async function getData(url) {
//   const response = await fetch(url);
//   return await response.json();
// }

// function myfunc() {
//   results = [];
//   return fetch(URL)
//     .then((response) => response.json())
//     .then((hitsJSON) => {
//       return hitsJSON.hits.map(item => {
//         return {
//               id: item.id,
//               url: item.previewURL,
//               tags: item.tags
//           };
//       }));
//   });
//  }

// // и использование
// myfunc()
//   .then((results) => {
//     // do something
//   })

export {fetchPhotosData};
