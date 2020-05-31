import SortingComponent, {SortType} from '../components/sorting.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';
import {render, removeComponent} from '../utils/render.js';
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
    this._showedMovieControllers = [];
    this._filterChangeHandler = this._filterChangeHandler.bind(this);
    this._onSortTypeChangeHandler = this._onSortTypeChangeHandler.bind(this);
    this._onShowMoreButtonClickHandler = this._onShowMoreButtonClickHandler.bind(this);
    this._moviesModel.setFilterChangeHandler(this._filterChangeHandler);
    this._sortingComponent.setSortTypeChangeHandler(this._onSortTypeChangeHandler);
  }

  _onDataChange(oldData, newData) {

    this._api.updateMovie(oldData.id, newData.toRAW())
      .then((movieModel) => {
        const isSuccess = this._moviesModel.updateMovie(oldData.id, movieModel);

        if (isSuccess) {
          this._showedMovieControllers.forEach((controller) => {
            if (controller.getFilmId() === oldData.id) {
              controller.render(movieModel);
            }
          });
        }
      });
  }

  _onViewChange() {
    this._showedMovieControllers.forEach((it) => it.setDefaultView());
  }

  _renderMoviesBlock(container, movies) {
    const movieControllers = movies.
      map((movie) => {
        const movieController = new MovieController(
            container,
            this._onDataChange.bind(this),
            this._onViewChange.bind(this),
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
    render(this._mainMovieElement, this._showMoreButtonComponent, `afterend`);

    this._showMoreButtonComponent.setClickHandler(this._onShowMoreButtonClickHandler);
  }

  render() {
    render(this._boardComponent.getElement(), this._sortingComponent, `beforebegin`);

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
    render(this._boardComponent.getElement(), this._sortingComponent, `beforebegin`);
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
  }
}
