import SortingComponent, {SortType} from '../components/sorting.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';
import {PlaceForRender, render, removeComponent} from '../utils/render.js';
import {getMoviesByFilter} from '../utils/filter.js';
import {FilterType} from '../const.js';
import MovieController from './movie-controller.js';

const MOVIE_COUNT_BY_BUTTON = 5;
const EXTRA_MOVIE_COUNT = 2;
const INITIAL_MOVIE_COUNT = 5;
let movieShowingCount = INITIAL_MOVIE_COUNT;

const getSortedMovies = (movies, sortType) => {
  const showingMovies = movies.slice();

  switch (sortType) {
    case SortType.DATE: {
      return showingMovies.sort((a, b) => b.details.releaseDate - a.details.releaseDate);
    }
    case SortType.RATING: {
      return showingMovies.sort((a, b) => b.rating - a.rating);
    }
    default: {
      return movies;
    }
  }
};

export default class PageController {
  constructor(boardComponent, moviesModel, api) {
    this._api = api;
    this._boardComponent = boardComponent;
    this._moviesModel = moviesModel;
    this._ratedMovieElement = boardComponent.getRatedMovieElement();
    this._commentMovieElement = boardComponent.getCommentMovieElement();
    this._mainMovieElement = boardComponent.getMainMovieElement();
    this._sortingComponent = new SortingComponent();
    this._sortType = SortType.DEFAULT;
    this._showMoreButtonComponent = null;
    this._statComponent = null;
    this._showedMovieControllers = [];
    this._filterChangeHandler = this._filterChangeHandler.bind(this);
    this._onSortTypeChangeHandler = this._onSortTypeChangeHandler.bind(this);
    this._onShowMoreButtonClickHandler = this._onShowMoreButtonClickHandler.bind(this);
    this._moviesModel.setFilterChangeHandler(this._filterChangeHandler);
    this._sortingComponent.setSortTypeChangeHandler(this._onSortTypeChangeHandler);
  }

  setStatComponent(statComponent) {
    this._statComponent = statComponent;
  }

  _updateMoviesModel(movieId, updatedMovie) {
    const isSuccess = this._moviesModel.updateMovie(movieId, updatedMovie);

    if (isSuccess) {
      this._showedMovieControllers.forEach((controller) => {
        if (controller.getFilmId() === movieId) {
          controller.render(updatedMovie);
        }
      });
    }

    const watchedMovies = getMoviesByFilter(this._moviesModel.getMovies(), FilterType.WATCHED);

    if (this._statComponent) {
      this._statComponent.onMovieChange(watchedMovies);
    }
  }

  _onMovieChange(movieId, updatedMovie) {
    this._api.updateMovie(movieId, updatedMovie.toRAW())
      .then((receivedMovies) => {
        this._updateMoviesModel(movieId, receivedMovies);
      });
  }

  _onCommentsChange(movieId, updatedMovie) {
    this._updateMoviesModel(movieId, updatedMovie);
  }

  _onViewChange() {
    this._showedMovieControllers.forEach((it) => it.setDefaultView());
  }

  _renderMoviesBlock(container, movies) {
    const movieControllers = movies.
      map((movie) => {
        const movieController = new MovieController(
            container,
            this._onMovieChange.bind(this),
            this._onViewChange.bind(this),
            this._onCommentsChange.bind(this),
            this._api
        );
        movieController.render(movie);

        return movieController;
      });

    this._showedMovieControllers = this._showedMovieControllers.concat(movieControllers);
  }

  _onShowMoreButtonClickHandler() {
    const prevMovieCount = movieShowingCount;
    movieShowingCount += MOVIE_COUNT_BY_BUTTON;

    const movies = this._moviesModel.getMovies();
    const sortedMovies = getSortedMovies(movies, this._sortType);
    const showingFilms = sortedMovies.slice(prevMovieCount, movieShowingCount);

    this._renderMoviesBlock(this._mainMovieElement, showingFilms);

    if (movieShowingCount >= this._moviesModel.getMovies().length) {
      removeComponent(this._showMoreButtonComponent);
      this._showMoreButtonComponent = null;
    }
  }

  _renderShowMoreButton() {
    if (movieShowingCount >= this._moviesModel.getMovies().length) {
      return;
    }

    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    render(this._mainMovieElement, this._showMoreButtonComponent, PlaceForRender.AFTEREND);

    this._showMoreButtonComponent.setClickHandler(this._onShowMoreButtonClickHandler);
  }

  render() {
    render(this._boardComponent.getElement(), this._sortingComponent, PlaceForRender.BEFOREBEGIN);

    const movies = this._moviesModel.getMovies();
    const sortedMovies = getSortedMovies(movies, this._sortType);

    const topRatedShowingFilms = getSortedMovies(movies, SortType.RATING).slice(0, EXTRA_MOVIE_COUNT);

    const mostCommentedShowingFilms = movies
      .sort((a, b) => b.commentsQuantity - a.commentsQuantity)
      .slice(0, EXTRA_MOVIE_COUNT);

    const mainShowingFilms = sortedMovies.slice(0, movieShowingCount);

    this._renderMoviesBlock(this._ratedMovieElement, topRatedShowingFilms);
    this._renderMoviesBlock(this._commentMovieElement, mostCommentedShowingFilms);
    this._renderMoviesBlock(this._mainMovieElement, mainShowingFilms);

    if (movieShowingCount < movies.length && !this._showMoreButtonComponent) {
      this._renderShowMoreButton();
    }

    if (movieShowingCount >= movies.length && this._showMoreButtonComponent) {
      removeComponent(this._showMoreButtonComponent);
      this._showMoreButtonComponent = null;
    }
  }

  _onSortTypeChangeHandler(sortType) {
    this._sortType = sortType;

    removeComponent(this._sortingComponent);
    render(this._boardComponent.getElement(), this._sortingComponent, PlaceForRender.BEFOREBEGIN);
    this._sortingComponent.setSortTypeChangeHandler(this._onSortTypeChangeHandler);

    const sortedMovies = getSortedMovies(this._moviesModel.getMovies(), sortType);

    this._mainMovieElement.innerHTML = ``;
    movieShowingCount = INITIAL_MOVIE_COUNT;
    this._renderMoviesBlock(this._mainMovieElement, sortedMovies.slice(0, movieShowingCount));
  }

  _filterChangeHandler() {
    this._showedMovieControllers.forEach((controller) => controller.destroy());
    this._showedMovieControllers = [];
    movieShowingCount = INITIAL_MOVIE_COUNT;

    this.render();

    const watchedMovies = getMoviesByFilter(this._moviesModel.getMovies(), FilterType.WATCHED);

    if (this._statComponent) {
      this._statComponent.onMovieChange(watchedMovies);
      this._statComponent.rerender();
    }
  }

  hide() {
    this._boardComponent.hide();
  }

  show() {
    this._boardComponent.show();
    this._sortingComponent.resetSortType();
    this._onSortTypeChangeHandler(SortType.DEFAULT);
  }
}
