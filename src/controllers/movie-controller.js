import FilmComponent from '../components/film.js';
import CommentComponent from '../components/comment.js';
import FilmPopupComponent from '../components/film-popup.js';
import CommentsModel from '../models/comments-model.js';
import MovieModel from '../models/movie-model.js';
import {render, appendChildComponent, removeChildElement, replaceComponent, removeComponent} from '../utils/render.js';

const ESC_KEY = `Escape`;
const ENTER_KEY = `Enter`;
const page = document.querySelector(`body`);

export default class MovieController {
  constructor(container, onMovieChange, onViewChange, onCommentsChange, api) {
    this._container = container;
    this._onMovieChange = onMovieChange;
    this._onViewChange = onViewChange;
    this._onCommentsChange = onCommentsChange;
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
    shakingElement.classList.add(`shake`);

    setTimeout(() => {
      shakingElement.classList.remove(`shake`);
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
    this._onMovieChange(this._film.id, Object.assign(MovieModel.clone(this._film), this._film, {
      isAtWatchlist: !this._film.isAtWatchlist
    }));
  }

  _onWatchedButtonClickHandler() {
    this._onMovieChange(this._film.id, Object.assign(MovieModel.clone(this._film), this._film, {
      isWatched: !this._film.isWatched
    }));
  }

  _onFavoriteButtonClickHandler() {
    this._onMovieChange(this._film.id, Object.assign(MovieModel.clone(this._film), this._film, {
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
    if (evt.ctrlKey && evt.key === ENTER_KEY) {
      const localComment = this._getFormData();

      if (localComment) {
        this._popupComponent.disableTextField();
        this._popupComponent.removeTextFieldBorder();

        this._api.addComment(this._film.id, localComment)
          .then((response) => {
            this._commentsModel.setComments(response.comments);
            this._onCommentsChange(this._film.id, new MovieModel(response.movie));
            this._popupComponent.rerender(
                this._setPopupButtonClickHandlers.bind(this),
                this._commentsModel.getCommentsQuantity()
            );
            this._renderComments(this._commentsModel.getComments());
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
    this._api.deleteComment(commentId)
      .then(() => {
        const isSuccess = this._commentsModel.deleteComment(commentId);
        const updatedCommentsIds = this._commentsModel.getCommentsIds();
        const updatedMovie = Object.assign(MovieModel.clone(this._film), this._film, {
          comments: updatedCommentsIds
        });

        if (isSuccess) {
          this._onCommentsChange(this._film.id, updatedMovie);
          this._popupComponent.rerender(this._setPopupButtonClickHandlers.bind(this), this._commentsModel.getCommentsQuantity());
          const updatedComments = this._commentsModel.getComments();
          this._renderComments(updatedComments);
        }
      })
      .catch(() => {
        this._renderComments(this._commentsModel.getComments());
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

  _renderComments(comments) {
    if (comments.length > 0) {
      const commentsList = this._popupComponent.getCommentsList();
      commentsList.innerHTML = ``;

      comments.forEach((comment) => {
        const commentComponent = new CommentComponent(comment);

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

    this._popupComponent = new FilmPopupComponent(this._film, this._film.comments.length);
    this._setPopupButtonClickHandlers();

    if (oldPopupComponent) {
      replaceComponent(this._popupComponent, oldPopupComponent);
    }

    appendChildComponent(page, this._popupComponent);

    document.addEventListener(`keydown`, this._onEscKeyDown);

    if (!this._commentsModel) {
      this._commentsModel = new CommentsModel();

      this._api.getComments(this._film.id)
      .then((receivedComments) => {
        this._commentsModel.setComments(receivedComments);
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
