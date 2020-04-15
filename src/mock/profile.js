const getUserTitle = (watchedFilms) => {
  if (watchedFilms === 0) {
    return ``;
  }

  if (watchedFilms < 11) {
    return `novice`;
  }

  if (watchedFilms < 21) {
    return `fan`;
  }

  return `movie buff`;
};

export {getUserTitle};
