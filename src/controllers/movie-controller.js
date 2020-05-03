import FilmComponent from './../components/film.js';
import CommentComponent from './../components/comment.js';
import FilmPopupComponent from './../components/film-popup.js';
import {render, appendChildComponent, removeChildElement} from './../utils/render.js';

const ESC_KEY_CODE = 27;
const page = document.querySelector(`body`);

export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._filmCardComponent = null;
    this._popupComponent = null;
  }

  _renderComments(popup) {
    const comments = popup.getComments();
    const commentsList = popup.getCommentsList();
    comments.forEach((comment) => {
      const commentElement = new CommentComponent(comment);
      appendChildComponent(commentsList, commentElement);
    });
  }

  render(film) {
    const oldFilmCardComponent = this._filmCardComponent;
    const oldPopupComponent = this._popupComponent;

    this._filmCardComponent = new FilmComponent(film);
    this._popupComponent = new FilmPopupComponent(film);

    const showPopup = () => {
      this._renderComments(this._popupComponent);
      appendChildComponent(page, this._popupComponent);
      document.addEventListener(`keydown`, onEscKeyDown);
    };

    const closePopup = () => {
      removeChildElement(page, this._popupComponent);
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    const onEscKeyDown = (evt) => {
      if (evt.keyCode === ESC_KEY_CODE) {
        closePopup();
      }
    };

    const watchlistButtonClickHandler = () => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isAtWatchlist: !film.isAtWatchlist,
      }));
    };

    const watchedButtonClickHandler = () => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isWhatched: !film.isWhatched,
      }));
    };

    const favoriteButtonClickHandler = () => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isFavorite: !film.isFavorite,
      }));
    };

    this._filmCardComponent.setPopupOpenHandler(showPopup);
    this._filmCardComponent.setWatchlistButtonClickHandler((evt) => {
      evt.preventDefault();
      watchlistButtonClickHandler();
    });

    this._filmCardComponent.setWatchedButtonClickHandler((evt) => {
      evt.preventDefault();
      watchedButtonClickHandler();
    });

    this._filmCardComponent.setFavoriteButtonClickHandler((evt) => {
      evt.preventDefault();
      favoriteButtonClickHandler();
    });

    this._popupComponent.setCloseButtonClickHandler(closePopup);
    this._popupComponent.setWatchlistButtonClickHandler(watchlistButtonClickHandler);
    this._popupComponent.setWatchedButtonClickHandler(watchedButtonClickHandler);
    this._popupComponent.setFavoriteButtonClickHandler(favoriteButtonClickHandler);

    render(this._container, this._filmCardComponent);
  }
}
