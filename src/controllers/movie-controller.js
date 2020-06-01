import FilmComponent from '../components/film.js';
import CommentComponent from '../components/comment.js';
import FilmPopupComponent from '../components/film-popup.js';
import CommentsModel from '../models/comments-model.js';
import MovieModel from '../models/movie-model.js';
import {render, appendChildComponent, removeChildElement, replaceComponent, removeComponent} from '../utils/render.js';

const ESC_KEY = `Escape`;
const SHAKE_ANIMATION_TIMEOUT = 600;
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
    return this._film.id;
  }

  _shake(shakingElement) {
    shakingElement.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      shakingElement.style.animation = ``;
    }, 2000);
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

  _getFormData() {
    const form = this._popupComponent.getFormElement();
    const formData = new FormData(form);
    const emojiContainer = this._popupComponent.getEmojiContainer();
    const commentText = formData.get(`comment`).trim();

    if (emojiContainer.innerHTML !== `` && commentText !== ``) {
      const emojiType = emojiContainer.firstChild.dataset.type;

      return {
        comment: commentText,
        date: new Date().toISOString(),
        emotion: emojiType,
      };
    }

    return null;
  }

  _onAddComment(evt) {
    if (evt.ctrlKey && evt.key === `Enter`) {
      const localComment = this._getFormData();

      if (localComment) {
        this._popupComponent.disableTextField();
        this._popupComponent.removeTextFieldBorder();
  
        this._api.addComment(this._film.id, localComment)
          .then((response) => {
            const isSuccess = this._commentsModel.setComments(response.comments);
  
            if (isSuccess) {
              this._updateMoviesModel(this._film.id, new MovieModel(response.movie));
              this._showPopup();
            }
          })
          .catch(() => {
            this._popupComponent.enableTextField();
            this._popupComponent.setTextFieldBorder();
            this._shake(this._popupComponent.getFormElement());
          });
      } else {
        this._shake(this._popupComponent.getFormElement());
      }
    }
  }

  _onDeleteComment(commentId) {
    const comments = this._commentsModel.getComments();
    this._renderComments(comments, commentId);

    this._api.deleteComment(commentId)
      .then(() => {
        const isSuccess = this._commentsModel.deleteComment(commentId);
        const updatedComments = this._commentsModel.getCommentsIds();
        const updatedMovie = Object.assign(MovieModel.clone(this._film), this._film, {
          comments: updatedComments
        });

        if (isSuccess) {
          this._updateMoviesModel(this._film.id, updatedMovie);
          this._showPopup();
        }
      })
      .catch(() => {
        this._renderComments(comments);
        this._shake(this._popupComponent.getCommentsList());
      });

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

  _renderComments(comments, deletingCommentId) {
    if (comments.length > 0) {
      const commentsList = this._popupComponent.getCommentsList();
      commentsList.innerHTML = ``;

      comments.forEach((comment) => {
        let commentComponent = new CommentComponent(comment);

        if (deletingCommentId && deletingCommentId === comment.id) {
          commentComponent = new CommentComponent(comment, true);
        }

        appendChildComponent(commentsList, commentComponent);

        commentComponent.setDeleteButtonHandler((evt) => {
          evt.preventDefault();
          const commentId = commentComponent.getCommentId();
          this._onDeleteComment(commentId);
        });
      });
    }
  }

  _showPopup() {
    this._onViewChange();

    const oldPopupComponent = this._popupComponent;

    this._popupComponent = new FilmPopupComponent(this._film);

    this._setPopupButtonClickHandlers();

    if (oldPopupComponent) {
      replaceComponent(this._popupComponent, oldPopupComponent);
    }

    appendChildComponent(page, this._popupComponent);
    document.addEventListener(`keydown`, this._onEscKeyDown);

    if (!this._commentsModel) {
      this._commentsModel = new CommentsModel();

      this._api.getComments(this._film.id)
      .then((data) => {
        this._commentsModel.setComments(data);
        const comments = this._commentsModel.getComments();
        this._renderComments(comments);
      });
    } else {
      const comments = this._commentsModel.getComments();
      this._renderComments(comments);
    }
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
