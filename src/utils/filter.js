import {FilterType} from '../const.js';

const getMoviesByFilter = (movies, filterType) => {
  let movieList = [];

  switch (filterType) {
    case FilterType.ALL_MOVIES:
      movieList = movies;
      break;
    case FilterType.WATCHLIST:
      movieList = movies.filter((movie) => movie.isAtWatchlist);
      break;
    case FilterType.HISTORY:
      movieList = movies.filter((movie) => movie.isWatched);
      break;
    case FilterType.FAVORITES:
      movieList = movies.filter((movie) => movie.isFavorite);
  }

  return movieList;
};

export {getMoviesByFilter};
