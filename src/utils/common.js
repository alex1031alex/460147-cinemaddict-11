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

const getRandomNumber = (min, max) => Math.floor(min + Math.random() * (max - min + 1));

const getRandomArrayItem = (array) => array[getRandomNumber(0, array.length - 1)];

const capitalizeFirstSymbol = (string) => string.replace(/^\w/, string[0].toUpperCase());

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

const formatDuration = (duration) => {
  const hours = Math.trunc(duration / 60);
  const minutes = duration % 60;
  
  return minutes < 10 ? `${hours}h 0${minutes}m` : `${hours}h ${minutes}m`;
}

const formatRating = (rating) => rating % 1 === 0 ? `${rating}.0` : rating;

const cutText = (text, length) => text.length > length ? `${text.substring(0, length)}...` : text;

export {
  getRandomNumber,
  getRandomArrayItem,
  capitalizeFirstSymbol,
  formatDate,
  formatDateTime,
  formatDuration,
  formatRating,
  cutText
};
