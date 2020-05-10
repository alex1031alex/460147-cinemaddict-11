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
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._showedMovieControllers = [];
  }

  _onDataChange(oldData, newData) {
    const isSuccess = this._moviesModel.updateMovie(oldData.id, newData);

    if (isSuccess) {
      this._showedMovieControllers.forEach((controller) => {
        if (controller.getId() === oldData.id) {
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

  _renderShowMoreButton() {
    const movies = this._moviesModel.getMovies();

    if (movieShowingCount >= movies.length) {
      return;
    }

    render(this._mainMovieElement, this._showMoreButtonComponent, `afterend`);

    this._showMoreButtonComponent.setClickHandler(() => {
      const prevMovieCount = movieShowingCount;
      movieShowingCount += MOVIE_COUNT_BY_BUTTON;
      const showingFilms = movies.slice(prevMovieCount, movieShowingCount);

      this._renderMoviesBlock(this._mainMovieElement, showingFilms);

      if (movieShowingCount >= movies.length) {
        removeComponent(this._showMoreButtonComponent);
      }
    });
  }

  render() {
    const movies = this._moviesModel.getMovies();
    const topRatedShowingFilms = movies
      .sort((a, b) => b.rating - a.rating)
      .slice(0, EXTRA_MOVIE_COUNT);

    const mostCommentedShowingFilms = movies
      .sort((a, b) => b.comments.length - a.comments.length)
      .slice(0, EXTRA_MOVIE_COUNT);

    const mainShowingFilms = movies.slice(0, INITIAL_MOVIE_COUNT);

    this._renderMoviesBlock(this._ratedMovieElement, topRatedShowingFilms);
    this._renderMoviesBlock(this._commentMovieElement, mostCommentedShowingFilms);
    this._renderMoviesBlock(this._mainMovieElement, mainShowingFilms);
    this._renderShowMoreButton();
  }
}
