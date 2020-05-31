import FilmComponent from '../components/film.js';
import CommentComponent from '../components/comment.js';
import FilmPopupComponent from '../components/film-popup.js';
import CommentsModel from '../models/comments-model.js';
import MovieModel from '../models/movie-model.js';
import {render, appendChildComponent, removeChildElement, replaceComponent, removeComponent} from '../utils/render.js';

const ESC_KEY = `Escape`;
const page = document.querySelector(`body`);

export default class MovieController {
  constructor(container, onDataChange, onViewChange, updateMoviesModel, api) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._updateMoviesModel = updateMoviesModel;
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
    this._onAddComment = this._onAddComment.bind(this);
    this._showPopup = this._showPopup.bind(this);
    this._api = api;
  }

  getFilmId() {
    if (this._film) {
      return this._film.id;
    }
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
    this._onDataChange(this._film, Object.assign(MovieModel.clone(this._film), this._film, {
      isAtWatchlist: !this._film.isAtWatchlist
    }));
  }

  _onWatchedButtonClickHandler() {
    this._onDataChange(this._film, Object.assign(MovieModel.clone(this._film), this._film, {
      isWatched: !this._film.isWatched
    }));
  }

  _onFavoriteButtonClickHandler() {
    this._onDataChange(this._film, Object.assign(MovieModel.clone(this._film), this._film, {
      isFavorite: !this._film.isFavorite
    }));
  }

  _onAddComment(evt) {
    if (evt.ctrlKey && evt.key === `Enter`) {
      const emojiContainer = this._popupComponent.getEmojiContainer();
      const commentText = this._popupComponent.getCommentTextInputElement().value.trim();

      if (emojiContainer.innerHTML !== `` && commentText !== ``) {
        const emojiType = emojiContainer.firstChild.dataset.type;

        const localComment = {
          comment: commentText,
          date: new Date().toISOString(),
          emotion: emojiType,
        };

        this._api.addComment(this._film.id, localComment)
          .then((response) => {
            this._film = new MovieModel(response.movie);
            this._commentsModel.setComments(response.comments);
          });
      }
    }
  }

  _setPopupButtonClickHandlers() {
    this._popupComponent.setCloseButtonClickHandler(this._closePopup);
    this._popupComponent.setWatchlistButtonClickHandler(this._onWatchlistButtonClickHandler);
    this._popupComponent.setWatchedButtonClickHandler(this._onWatchedButtonClickHandler);
    this._popupComponent.setFavoriteButtonClickHandler(this._onFavoriteButtonClickHandler);
    this._popupComponent.setEmojiClickHandler(this._onEmojiClickHandler);
    document.addEventListener(`keydown`, this._onAddComment);
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

  _renderComments(comments) {
    if (comments.length > 0) {
      const commentsList = this._popupComponent.getCommentsList();

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
  }

  _showPopup() {
    this._onViewChange();

    if (!this._commentsModel) {
      this._commentsModel = new CommentsModel();
      this._commentsModel.setDataChangeHandler(this._onCommentChange.bind(this));

      this._api.getComments(this._film.id)
      .then((data) => {
        this._commentsModel.setComments(data);
      });
    }

    const oldPopupComponent = this._popupComponent;

    this._popupComponent = new FilmPopupComponent(this._film);

    this._setPopupButtonClickHandlers();

    if (oldPopupComponent) {
      replaceComponent(this._popupComponent, oldPopupComponent);
    }

    appendChildComponent(page, this._popupComponent);
    document.addEventListener(`keydown`, this._onEscKeyDown);

    const comments = this._commentsModel.getComments();
    this._renderComments(comments);
  }

  _onCommentChange() {
    this._updateMoviesModel(this._film.id, this._film);
    this._showPopup();
  }

  render(movieModel) {
    this._film = movieModel;

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

    if (this._popupComponent) {
      removeComponent(this._popupComponent);
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  setDefaultView() {
    removeChildElement(page, this._popupComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }
}
