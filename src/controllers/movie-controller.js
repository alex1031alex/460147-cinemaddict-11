import FilmComponent from '../components/film.js';
import CommentComponent from '../components/comment.js';
import FilmPopupComponent from '../components/film-popup.js';
import {render, appendChildComponent, removeChildElement, replaceComponent} from '../utils/render.js';

const ESC_KEY = `Escape`;
const page = document.querySelector(`body`);

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._filmCardComponent = null;
    this._popupComponent = null;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._closePopup = this._closePopup.bind(this);
    this._film = null;
  }

  _renderComments(popup) {
    const comments = popup.getComments();
    const commentsList = popup.getCommentsList();
    comments.forEach((comment) => {
      const commentElement = new CommentComponent(comment);
      appendChildComponent(commentsList, commentElement);
    });
  }

  _onEscKeyDown(evt) {
    if (evt.key === ESC_KEY) {
      this._closePopup();
    }
  }

  _closePopup() {
    removeChildElement(page, this._popupComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _showPopup() {
    this._popupComponent = new FilmPopupComponent(this._film);

    this._popupComponent.setCloseButtonClickHandler(this._onCloseButtonClickHandler);
    this._popupComponent.setWatchlistButtonClickHandler(this._watchlistButtonClickHandler);
    this._popupComponent.setWatchedButtonClickHandler(this._watchedButtonClickHandler);
    this._popupComponent.setFavoriteButtonClickHandler(this._favoriteButtonClickHandler);
    this._popupComponent.setEmojiClickHandler(this._emojiClickHandler);

    this._onViewChange();
    this._renderComments(this._popupComponent);
    appendChildComponent(page, this._popupComponent);
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _onCloseButtonClickHandler() {
    this._closePopup();
  }

  _emojiClickHandler(evt) {
    this._popupComponent.setEmojiById(evt.target.id);
  }

  _watchlistButtonClickHandler() {
    this._onDataChange(this, this._film, {...this._film, isAtWatchlist: !this._film.isAtWatchlist});
  }

  _watchedButtonClickHandler() {
    this._onDataChange(this, this._film, {...this._film, isWatched: !this._film.isWatched});
  }

  _favoriteButtonClickHandler() {
    this._onDataChange(this, this._film, {...this._film, isFavorite: !this._film.isFavorite});
  }

  render(film) {
    this._film = film;
    const oldFilmCardComponent = this._filmCardComponent;
    const oldPopupComponent = this._popupComponent;

    this._filmCardComponent = new FilmComponent(this._film);

    this._filmCardComponent.setPopupOpenHandler(this._showPopup);
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

    if (oldFilmCardComponent && oldPopupComponent) {
      replaceComponent(this._filmCardComponent, oldFilmCardComponent);
      replaceComponent(this._popupComponent, oldPopupComponent);
    } else {
      render(this._container, this._filmCardComponent);
    }
  }

  setDefaultView() {
    this._closePopup();
  }
}
