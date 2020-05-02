import ShowMoreButtonComponent from './../components/show-more-button.js';
import {render, removeComponent} from './../utils/render.js';
import MovieController from './movie-controller.js';

const MOVIE_COUNT_BY_BUTTON = 5;
const EXTRA_MOVIE_COUNT = 2;
const INITIAL_MOVIE_COUNT = 5;
let movieShowingCount = INITIAL_MOVIE_COUNT;

export default class PageController {
  constructor(boardComponent) {
    this._movies = [];
    this._board = boardComponent;
    this._ratedMovieElement = boardComponent.getRatedMovieElement();
    this._commentMovieElement = boardComponent.getCommentMovieElement();
    this._mainMovieElement = boardComponent.getMainMovieElement();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
  }

  _renderFilmCards(movieContainer, movies) {
    movies
    .forEach((movie) => {
      const movieController = new MovieController(movieContainer);
      movieController.render(movie);
    });
  }

  _renderShowMoreButton() {
    if (movieShowingCount >= this._movies.length) {
      return;
    }

    render(this._mainMovieElement, this._showMoreButtonComponent, `afterend`);

    this._showMoreButtonComponent.setClickHandler(() => {
      const prevMovieCount = movieShowingCount;
      movieShowingCount += MOVIE_COUNT_BY_BUTTON;
      const showingFilms = this._movies.slice(prevMovieCount, movieShowingCount);
      this._renderFilmCards(this._mainMovieElement, showingFilms);

      if (movieShowingCount >= this._movies.length) {
        removeComponent(this._showMoreButtonComponent);
      }
    });
  }

  render(movies) {
    this._movies = movies;
    const topRatedShowingFilms = this._movies
      .sort((a, b) => b.rating - a.rating)
      .slice(0, EXTRA_MOVIE_COUNT);
    const mostCommentedShowingFilms = this._movies
      .sort((a, b) => b.comments.length - a.comments.length)
      .slice(0, EXTRA_MOVIE_COUNT);
    const mainShowingFilms = this._movies.slice(0, INITIAL_MOVIE_COUNT);

    this._renderFilmCards(this._ratedMovieElement, topRatedShowingFilms);
    this._renderFilmCards(this._commentMovieElement, mostCommentedShowingFilms);
    this._renderFilmCards(this._mainMovieElement, mainShowingFilms);
    this._renderShowMoreButton();
  }
}
