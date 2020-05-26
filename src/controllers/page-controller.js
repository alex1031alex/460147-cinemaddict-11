import SortingComponent, {SortType} from '../components/sorting.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';
import {render, removeComponent, replaceComponent} from '../utils/render.js';
import MovieController from './movie-controller.js';

const MOVIE_COUNT_BY_BUTTON = 5;
const EXTRA_MOVIE_COUNT = 2;
const INITIAL_MOVIE_COUNT = 5;
let movieShowingCount = INITIAL_MOVIE_COUNT;

const getSortedMovies = (movies, sortType) => {
  const showingMovies = movies.slice();
  let sortedMovies = [];

  switch (sortType) {
    case SortType.DEFAULT: 
      sortedMovies = showingMovies;
      break;
    case SortType.DATE:
      sortedMovies = showingMovies.sort((a, b) => b.details.releaseDate - a.details.releaseDate);
      break;
    case SortType.RATING:
      sortedMovies = showingMovies.sort((a, b) => b.rating - a.rating);
      break;
  }

  return sortedMovies;
};

export default class PageController {
  constructor(boardComponent, moviesModel) {
    this._boardComponent = boardComponent;
    this._moviesModel = moviesModel;
    this._ratedMovieElement = boardComponent.getRatedMovieElement();
    this._commentMovieElement = boardComponent.getCommentMovieElement();
    this._mainMovieElement = boardComponent.getMainMovieElement();
    this._sortingComponent = null;
    this._showMoreButtonComponent = null;
    this._showedMovieControllers = [];
    this._filterChangeHandler = this._filterChangeHandler.bind(this);
    this._onShowMoreButtonClickHandler = this._onShowMoreButtonClickHandler.bind(this);
    this._moviesModel.setFilterChangeHandler(this._filterChangeHandler);
  }

  _onDataChange(oldData, newData) {
    const isSuccess = this._moviesModel.updateMovie(oldData.id, newData);

    if (isSuccess) {
      this._showedMovieControllers.forEach((controller) => {
        if (controller.getFilmId() === oldData.id) {
          controller.render(newData);
        }
      });
    }
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
            this._onViewChange.bind(this)
        );
        movieController.render(movie);

        return movieController;
      });

    this._showedMovieControllers = this._showedMovieControllers.concat(movieControllers);
  }

  _onShowMoreButtonClickHandler() {
    const prevMovieCount = movieShowingCount;
    movieShowingCount += MOVIE_COUNT_BY_BUTTON;
    const showingFilms = this._moviesModel.getMovies().slice(prevMovieCount, movieShowingCount);

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
    const oldSortingComponent = this._sortingComponent;
    this._sortingComponent = new SortingComponent();

    if (oldSortingComponent) {
      replaceComponent(this._sortingComponent, oldSortingComponent);
    } else {
      render(this._boardComponent.getElement(), this._sortingComponent, `beforebegin`);
    }

    const movies = this._moviesModel.getMovies();
    const topRatedShowingFilms = movies
      .sort((a, b) => b.rating - a.rating)
      .slice(0, EXTRA_MOVIE_COUNT);

    const mostCommentedShowingFilms = movies
      .sort((a, b) => b.commentsQuantity - a.commentsQuantity)
      .slice(0, EXTRA_MOVIE_COUNT);

    const mainShowingFilms = movies.slice(0, movieShowingCount);

    this._renderMoviesBlock(this._ratedMovieElement, topRatedShowingFilms);
    this._renderMoviesBlock(this._commentMovieElement, mostCommentedShowingFilms);
    this._renderMoviesBlock(this._mainMovieElement, mainShowingFilms);

    this._sortingComponent.setSortTypeChangeHandler((sortType) => {
      this._mainMovieElement.innerHTML = ``;

      const sortedMovies = getSortedMovies(movies, sortType);
      this._renderMoviesBlock(this._mainMovieElement, sortedMovies.slice(0, movieShowingCount));
    });

    if (movieShowingCount < movies.length && !this._showMoreButtonComponent) {
      this._renderShowMoreButton();
    }

    if (movieShowingCount >= movies.length && this._showMoreButtonComponent) {
      removeComponent(this._showMoreButtonComponent);
      this._showMoreButtonComponent = null;
    }
  }

  _filterChangeHandler() {
    this._showedMovieControllers.forEach((controller) => controller.destroy());
    this._showedMovieControllers = [];
    movieShowingCount = INITIAL_MOVIE_COUNT;

    this.render();
  }
}
