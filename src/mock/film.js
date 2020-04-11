const getRandomNumber = (min, max) => {
  return Math.floor(min + Math.random() * (max - min + 1));
};

const FILM_NAMES = [
  `Made for each other`,
  `Popeye meets Sinbad`,
  `Sagebrush trail`,
  `Santa Claus conqers the martians`,
  `The dance of life`,
  `The great Flamarion`,
  `The man with the golden arm`,
];

const generateFilm = () => {
  return {
    name: null,
    poster: null,
    description: null,
    comment: {},
  }
};

const generateFilms = () => {
  const films = [];
  return films;
};