import FilterComponent from '../components/filter.js';
import {PlaceForRender, render, replaceComponent} from '../utils/render.js';

const FilterType = {
  ALL_MOVIES: `All movies`,
  WATCHLIST: `Watchlist`,
  HISTORY: `History`,
  FAVORITES: `Favorites`,
};

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

export default class FilterController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._activeFilter = FilterType.ALL_MOVIES;
    this._filterComponent = null;
    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._moviesModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const allMovies = this._moviesModel.getMovies();
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        count: getMoviesByFilter(allMovies, filterType).length,
        checked: filterType === this._activeFilter,
      };
    });

    const oldComponent = this._filterComponent;

    this._filterComponent = new FilterComponent(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replaceComponent(this._filterComponent, oldComponent);
    } else {
      render(this._container, this._filterComponent, PlaceForRender.AFTERBEGIN);
    }
  }

  _onFilterChange(filterType) {
    this._moviesModel.setFilter(filterType);
    this._activeFilter = filterType;
  }

  _onDataChange() {
    this.render();
  }
}
