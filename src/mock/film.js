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

const DESCRIPTION_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
const SENTENCE_LIMIT = 5;

const generatePoster = (filmName) => {
  const posterName = filmName.toLowerCase().replace(/\s/g, `-`);
  switch(filmName) {
    case (`Made for each other`):
    case (`Popeye meets Sinbad`):
      return `${posterName}.png`;
    default: 
      return `${posterName}.jpg`;
  }
};

const generateRandomDesc = (text, limit) => {
  const descriptionItems = text.split(`.`);
  const count = getRandomNumber(1, limit);
  const randomDescItems = [];
  for (let i = 0; i < count; i++) {
    randomDescItems
      .push(`${descriptionItems[getRandomNumber(0, descriptionItems.length)]}.`);
  }
  return randomDescItems.join(` `);
}; 

const generateFilm = () => {
  const name = FILM_NAMES[getRandomNumber(0, FILM_NAMES.length)];
  const poster = generatePoster(name);
  const description = generateRandomDesc(DESCRIPTION_TEXT, SENTENCE_LIMIT);
  return {
    name,
    poster,
    description,
    comment: {},
  }
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};

export {generateFilms, generateFilm};