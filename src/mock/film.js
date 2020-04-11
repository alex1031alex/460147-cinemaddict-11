const getRandomNumber = (min, max) => {
  return Math.floor(min + Math.random() * (max - min + 1));
};

const getRandomArrayItem = (array) => {
  return array[getRandomNumber(0, array.length - 1)];
};

const FILM_NAMES = [
  `Made for Each Other`,
  `Popeye the Sailor meets Sinbad the Sailor`,
  `Sagebrush Trail`,
  `Santa Claus Conqers the Martians`,
  `The Dance of Life`,
  `The Great Flamarion`,
  `The Man with the Golden Arm`,
];

const POSTERS = [
  `made-of-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`,
];

const DESCRIPTION_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
const SENTENCE_LIMIT = 5;

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
  const name = getRandomArrayItem(FILM_NAMES);
  const poster = getRandomArrayItem(POSTERS);
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