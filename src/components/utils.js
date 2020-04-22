const MONTHS = [
  `Jan`,
  `Feb`,
  `Mar`,
  `Apr`,
  `May`,
  `Jun`,
  `Jul`,
  `Aug`,
  `Sep`,
  `Oct`,
  `Nov`,
  `Dec`,
];

const placeForRender = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`,
};

const getRandomNumber = (min, max) => Math.floor(min + Math.random() * (max - min + 1));

const getRandomArrayItem = (array) => array[getRandomNumber(0, array.length - 1)];

const capitalizeWords = (words) => words.map((it) => it.replace(/^\w/, it[0].toUpperCase()));

const formatDate = (date) => `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;

const formatDateTime = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const formattedDate = date.getDate() + 1;
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const fullCommentDate = `${year}/${month}/${formattedDate} ${hours}:${minutes}`;

  return fullCommentDate;
};

const formatRating = (rating) => rating % 1 === 0 ? `${rating}.0` : rating;

const cutText = (text, length) => text.length > length ? `${text.substring(0, length)}...` : text;

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (container, element, place = `beforeend`) => {
  switch (place) {
    case placeForRender.AFTERBEGIN:
      container.prepend(element);
      break;
    case placeForRender.BEFOREEND:
      container.append(element);
      break;
    case placeForRender.AFTEREND:
      container.parentElement.append(element);
  }
};

export {
  getRandomNumber,
  getRandomArrayItem,
  capitalizeWords,
  formatDate,
  formatDateTime,
  formatRating,
  cutText,
  createElement,
  render
};
