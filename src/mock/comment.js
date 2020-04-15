import {getRandomNumber, getRandomArrayItem} from './../components/utils.js';

const emojis = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`,
];

const authors = [
  `Niccolo Ammaniti`,
  `Tana French`,
  `Jo Nesbo`,
  `Nicolas Obregon`,
  `Georgio Faletti`,
];

const messages = [
  `Good movie!`,
  `Bad movie!`,
  `Too booring`,
  `I am exciting!`,
  `So, so`,
  `This movie is a must watch!`,
];

const generateCommentDate = () => {
  const targetDate = new Date();
  const diffValue = getRandomNumber(5, 360);
  targetDate.setDate(targetDate.getDate() - diffValue);
  return targetDate;
};

const generateComment = () => {
  return {
    emoji: getRandomArrayItem(emojis),
    date: generateCommentDate(),
    author: getRandomArrayItem(authors),
    message: getRandomArrayItem(messages),
  };
};

const generateComments = () => {
  const count = getRandomNumber(0, 5);
  const comments = [];
  for (let i = 0; i < count; i++) {
    comments.push(generateComment());
  }
  return comments;
};

export {generateComments};
