import moment from "moment";

const capitalizeFirstSymbol = (string) => string.replace(/^\w/, string[0].toUpperCase());
const formatDate = (date) => moment(date).format(`DD MMM YYYY`);
const formatTime = (runtime) => moment.utc(moment.duration(runtime, `minutes`).asMilliseconds()).format(`hh[h] mm[m]`);
const humanizeDate = (date) => moment(date).fromNow();

const formatRating = (rating) => rating % 1 === 0 ? `${rating}.0` : rating;

const cutText = (text, maxLength) => text.length > maxLength ? `${text.substring(0, maxLength)} &hellip;` : text;

export {
  getRandomNumber,
  getRandomArrayItem,
  capitalizeFirstSymbol,
  formatDate,
  humanizeDate,
  formatTime,
  formatRating,
  cutText
};
