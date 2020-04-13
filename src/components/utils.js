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

const capitalizeWords = (words) => {
  return words.map((it) => {
    return it.replace(/^\w/, it[0].toUpperCase());
  });
};

const formatDate = (date) => `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;

export {capitalizeWords, formatDate};
