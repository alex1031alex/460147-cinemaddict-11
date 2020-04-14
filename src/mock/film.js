import {getRandomNumber, getRandomArrayItem} from './utils.js';

const filmNames = [
  `Made for Each Other`,
  `Popeye the Sailor meets Sinbad the Sailor`,
  `Sagebrush Trail`,
  `Santa Claus Conqers the Martians`,
  `The Dance of Life`,
  `The Great Flamarion`,
  `The Man with the Golden Arm`,
  `Dream Warriors`,
  `Jessabelle`,
  `Stay Alive`,
  `Black Hawk Down`,
  `Sahara`,
];

const countries = [
  `USA`,
  `Great Britain`,
  `Germany`,
  `France`,
  `Italy`,
];

const posters = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`,
];

const DESCRIPTION_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
const SENTENCE_LIMIT = 5;
const AGE_RAITINGS = [0, 6, 12, 16, 18];

const genresNames = [
  `musical`,
  `western`,
  `drama`,
  `comedy`,
  `cartoon`,
  `mystery`,
  `horror`,
  `adventure`,
];

const generateRandomDesc = (text, limit) => {
  const descriptionItems = text.split(`.`);
  descriptionItems.pop();
  const count = getRandomNumber(1, limit);
  const randomDescItems = [];
  for (let i = 0; i < count; i++) {
    randomDescItems
      .push(`${getRandomArrayItem(descriptionItems)}.`);
  }
  return randomDescItems.join(` `);
};

const generateFilmDurationData = () => {
  const hours = getRandomNumber(1, 2);
  const minutes = hours < 2 ? getRandomNumber(30, 60) : getRandomNumber(0, 30);
  if (minutes < 10) {
    return `${hours}h 0${minutes}m`;
  }
  return `${hours}h ${minutes}m`;
};

const generateGenres = () => {
  const genresCount = getRandomNumber(1, 3);
  const genresArray = [];
  for (let i = 0; i < genresCount; i++) {
    genresArray.push(getRandomArrayItem(genresNames));
  }
  const genres = Array.from(new Set(genresArray));
  return genres;
};

const generateFilm = () => {
  const name = getRandomArrayItem(filmNames);
  const poster = getRandomArrayItem(posters);
  const description = generateRandomDesc(DESCRIPTION_TEXT, SENTENCE_LIMIT);
  const year = getRandomNumber(1930, 2014);
  const duration = generateFilmDurationData();
  const genres = generateGenres();
  const rating = +(getRandomNumber(10, 99) / 10).toFixed(1);
  return {
    name,
    poster,
    description,
    comments: [],
    year,
    duration,
    genres,
    rating,
    isAtWatchlist: getRandomNumber(0, 3) < 1,
    isWatched: getRandomNumber(0, 3) < 1,
    isFavorites: getRandomNumber(0, 3) < 1,
    details: {
      ageRating: getRandomArrayItem(AGE_RAITINGS),
      originTitle: name,
      releaseDate: new Date(year, getRandomNumber(0, 17), getRandomNumber(0, 30)),
      country: getRandomArrayItem(countries),
      director: `Anthony Mann`,
      writers: [`Anne Wigton`, `Heinz Herald`, `Richard Weil`],
      actors: [`Erich von Stroheim`, `Mary Beth`, `Hughes`, `Dan Dureya`],
    },
  };
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};

export {generateFilms, generateFilm};
