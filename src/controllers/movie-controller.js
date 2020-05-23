import FilmComponent from '../components/film.js';
import CommentComponent from '../components/comment.js';
import FilmPopupComponent from '../components/film-popup.js';
import CommentsModel from '../models/comments-model.js';
import {generateComments} from '../mock/comment.js';
import {render, appendChildComponent, removeChildElement, replaceComponent, removeComponent} from '../utils/render.js';

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
    this._commentsModel = null;
    this._onEmojiClickHandler = this._onEmojiClickHandler.bind(this);
    this._onWatchlistButtonClickHandler = this._onWatchlistButtonClickHandler.bind(this);
    this._onWatchedButtonClickHandler = this._onWatchedButtonClickHandler.bind(this);
    this._onFavoriteButtonClickHandler = this._onFavoriteButtonClickHandler.bind(this);
    this._showPopup = this._showPopup.bind(this);
  }

  getId() {
    return this._film.id;
  }

  _onEscKeyDown(evt) {
    if (evt.key === ESC_KEY) {
      this._closePopup();
    }
  }

  _closePopup() {
    removeChildElement(page, this._popupComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._commentsModel = null;
  }

  _onEmojiClickHandler(evt) {
    this._popupComponent.setEmojiById(evt.target.id);
  }

  _onWatchlistButtonClickHandler() {
    this._onDataChange(this._film, Object.assign({}, this._film, {
      isAtWatchlist: !this._film.isAtWatchlist
    }));
  }

  _onWatchedButtonClickHandler() {
    this._onDataChange(this._film, Object.assign({}, this._film, {
      isWatched: !this._film.isWatched
    }));
  }

  _onFavoriteButtonClickHandler() {
    this._onDataChange(this._film, Object.assign({}, this._film, {
      isFavorite: !this._film.isFavorite
    }));
  }

  _setPopupButtonClickHandlers() {
    this._popupComponent.setCloseButtonClickHandler(this._closePopup);
    this._popupComponent.setWatchlistButtonClickHandler(this._onWatchlistButtonClickHandler);
    this._popupComponent.setWatchedButtonClickHandler(this._onWatchedButtonClickHandler);
    this._popupComponent.setFavoriteButtonClickHandler(this._onFavoriteButtonClickHandler);
    this._popupComponent.setEmojiClickHandler(this._onEmojiClickHandler);
  }

  _setFilmCardButtonClickHandlers() {
    this._filmCardComponent.setPopupOpenHandler(this._showPopup);
    this._filmCardComponent.setWatchlistButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onWatchlistButtonClickHandler();
    });

    this._filmCardComponent.setWatchedButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onWatchedButtonClickHandler();
    });

    this._filmCardComponent.setFavoriteButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onFavoriteButtonClickHandler();
    });
  }

  _showPopup() {
    this._onViewChange();

    if (!this._commentsModel) {
      this._commentsModel = new CommentsModel();
      this._commentsModel.setComments(generateComments());
      this._commentsModel.setDataChangeHandler(this._onCommentChange.bind(this));
    }

    const comments = this._commentsModel.getComments();
    const oldPopupComponent = this._popupComponent;

    this._popupComponent = new FilmPopupComponent(this._film, comments);

    const commentsList = this._popupComponent.getCommentsList();

    if (comments.length > 0) {
      comments.forEach((comment) => {
        const commentComponent = new CommentComponent(comment);
        appendChildComponent(commentsList, commentComponent);
        commentComponent.setDeleteButtonHandler((evt) => {
          evt.preventDefault();
          const id = commentComponent.getCommentId();
          this._commentsModel.deleteComment(id);
        });
      });
    }

    this._setPopupButtonClickHandlers();

    if (oldPopupComponent) {
      replaceComponent(this._popupComponent, oldPopupComponent);
    }

    appendChildComponent(page, this._popupComponent);
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _onCommentChange() {
    this._onDataChange(this._film, Object.assign({}, this._film, {
      commentsQuantity: this._commentsModel.getComments().length
    }));
    this._showPopup();
  }

  render(film) {
    this._film = film;

    const oldFilmCardComponent = this._filmCardComponent;

    this._filmCardComponent = new FilmComponent(this._film);

    this._setFilmCardButtonClickHandlers();

    if (oldFilmCardComponent) {
      replaceComponent(this._filmCardComponent, oldFilmCardComponent);
    } else {
      render(this._container, this._filmCardComponent);
    }
  }

  destroy() {
    removeComponent(this._filmCardComponent);
    removeComponent(this._popupComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  setDefaultView() {
    removeChildElement(page, this._popupComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }
}
