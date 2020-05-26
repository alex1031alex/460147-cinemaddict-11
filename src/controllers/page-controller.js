import ShowMoreButtonComponent from '../components/show-more-button.js';
import {render, removeComponent} from '../utils/render.js';
import MovieController from './movie-controller.js';

const MOVIE_COUNT_BY_BUTTON = 5;
const EXTRA_MOVIE_COUNT = 2;
const INITIAL_MOVIE_COUNT = 5;
let movieShowingCount = INITIAL_MOVIE_COUNT;

export default class PageController {
  constructor(boardComponent, moviesModel) {
    this._board = boardComponent;
    this._moviesModel = moviesModel;
    this._ratedMovieElement = boardComponent.getRatedMovieElement();
    this._commentMovieElement = boardComponent.getCommentMovieElement();
    this._mainMovieElement = boardComponent.getMainMovieElement();
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
    const movies = this._moviesModel.getMovies();
    const topRatedShowingFilms = movies
      .sort((a, b) => b.rating - a.rating)
      .slice(0, EXTRA_MOVIE_COUNT);

    const mostCommentedShowingFilms = movies
      .sort((a, b) => b.commentsQuantity - a.commentsQuantity)
      .slice(0, EXTRA_MOVIE_COUNT);

    const mainShowingFilms = movies.slice(0, INITIAL_MOVIE_COUNT);

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

  _filterChangeHandler() {
    this._showedMovieControllers.forEach((controller) => controller.destroy());
    this._showedMovieControllers = [];
    movieShowingCount = INITIAL_MOVIE_COUNT;

    this.render();
  }
}
