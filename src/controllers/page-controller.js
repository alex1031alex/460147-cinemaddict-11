import FilmComponent from './../components/film.js';
import CommentComponent from './../components/comment.js';
import ShowMoreButtonComponent from './../components/show-more-button.js';
import FilmPopupComponent from './../components/film-popup.js';
import {render, remove, appendChildComponent, removeChildElement} from './../utils/render.js';

const ESC_KEY_CODE = 27;
const MOVIE_COUNT_BY_BUTTON = 5;
const EXTRA_MOVIE_COUNT = 2;
const INITIAL_MOVIE_COUNT = 5;
let movieShowingCount = INITIAL_MOVIE_COUNT;

export default class PageController {
  constructor(boardComponent) {
    this._board = boardComponent;
    this._ratedMovieElement = boardComponent.getRatedMovieElement();
    this._commentMovieElement = boardComponent.getCommentMovieElement();
    this._mainMovieElement = boardComponent.getMainMovieElement();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
  }

  _renderComments(popup) {
    const comments = popup.getComments();
    const commentsList = popup.getElement().querySelector(`.film-details__comments-list`);
    comments.forEach((comment) => {
      const commentElement = new CommentComponent(comment);
      appendChildComponent(commentsList, commentElement);
    });
  }

  _renderFilmCard(movieContainer, movie) {
    const filmCardComponent = new FilmComponent(movie);
    const popupComponent = new FilmPopupComponent(movie);
  
    const showPopup = () => {
      this._renderComments(popupComponent);
      appendChildComponent(movieContainer, popupComponent);
      document.addEventListener(`keydown`, onEscKeyDown);
    };

    const closePopup = () => {
      removeChildElement(movieContainer, popupComponent);
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    const onEscKeyDown = (evt) => {
      if (evt.keyCode === ESC_KEY_CODE) {
        closePopup();
      }
    };

    filmCardComponent.setPopupOpenHandler(showPopup);
    popupComponent.setCloseButtonClickHandler(closePopup);

    render(movieContainer, filmCardComponent);
  }

  _renderFilmCards(movieContainer, movies) {
    movies
    .forEach((movie) => {
      this._renderFilmCard(movieContainer, movie);
    });
  }

  render(movies) {
    const topRatedShowingFilms = movies
      .sort((a, b) => b.rating - a.rating)
      .slice(0, EXTRA_MOVIE_COUNT);
    const mostCommentedShowingFilms = movies
      .sort((a, b) => b.comments.length - a.comments.length)
      .slice(0, EXTRA_MOVIE_COUNT);
    const mainShowingFilms = movies.slice(0, INITIAL_MOVIE_COUNT);

    this._renderFilmCards(this._ratedMovieElement, topRatedShowingFilms);
    this._renderFilmCards(this._commentMovieElement, mostCommentedShowingFilms);
    this._renderFilmCards(this._mainMovieElement, mainShowingFilms);

    render(this._mainMovieElement, this._showMoreButtonComponent, `afterend`);

    this._showMoreButtonComponent.setClickHandler(() => {
      const prevMovieCount = movieShowingCount;
      movieShowingCount += MOVIE_COUNT_BY_BUTTON;
      const showingFilms = movies.slice(prevMovieCount, movieShowingCount);
      this._renderFilmCards(this._mainMovieElement, showingFilms);

      if (movieShowingCount >= movies.length) {
        remove(this._showMoreButtonComponent);
      }
    });
  }
}
