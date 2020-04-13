const getUserTitle = (watchedFilms) => {
  if (watchedFilms >= 1 && watchedFilms <= 10) {
    return `novice`;
  } else if (watchedFilms >= 11 && watchedFilms <= 20) {
    return `fan`;
  } else if (watchedFilms >= 21) {
    return `movie buff`;
  }
  return ``;
};

export {getUserTitle};
