import {FilterType} from '../const.js';

const getMoviesByFilter = (movies, filterType) => {
  switch (filterType) {
    case FilterType.ALL_MOVIES:
      return movies;
    case FilterType.WATCHLIST:
      return movies.filter((movie) => movie.isAtWatchlist);
    case FilterType.HISTORY:
      return movies.filter((movie) => movie.isWatched);
    case FilterType.FAVORITES:
      return movies.filter((movie) => movie.isFavorite);
  }
};

export {getMoviesByFilter};