const getRandomNumber = (min, max) => {
  return Math.floor(min + Math.random() * (max - min + 1));
};

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