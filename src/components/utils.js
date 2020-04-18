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

export {capitalizeWords, formatDate, formatDateTime, formatRating, getRandomNumber, getRandomArrayItem, cutText};
