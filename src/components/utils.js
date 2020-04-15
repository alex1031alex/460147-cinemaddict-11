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

const getRandomNumber = (min, max) => {
  return Math.floor(min + Math.random() * (max - min + 1));
};

const getRandomArrayItem = (array) => {
  return array[getRandomNumber(0, array.length - 1)];
};

const capitalizeWords = (words) => words.map((it) => it.replace(/^\w/, it[0].toUpperCase()));

const formatDate = (date) => `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;

const cutText = (text, length) => text.length > length ? `${text.substring(0, length)}...` : text; 

export {capitalizeWords, formatDate, getRandomNumber, getRandomArrayItem, cutText};
