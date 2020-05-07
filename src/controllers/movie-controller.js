import FilmComponent from './../components/film.js';
import CommentComponent from './../components/comment.js';
import FilmPopupComponent from './../components/film-popup.js';
import {render, appendChildComponent, removeChildElement, replaceComponent} from './../utils/render.js';

const ESC_KEY = `Escape`;
const EMOJI_WIDTH = 55;
const EMOJI_HEIGHT = 55;
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

  render(film) {
    this._film = film;
    const oldFilmCardComponent = this._filmCardComponent;
    const oldPopupComponent = this._popupComponent;

    this._filmCardComponent = new FilmComponent(this._film);
    this._popupComponent = new FilmPopupComponent(this._film);

    const showPopup = () => {
      this._onViewChange();
      this._renderComments(this._popupComponent);
      appendChildComponent(page, this._popupComponent);
      document.addEventListener(`keydown`, this._onEscKeyDown);
    };

    const watchlistButtonClickHandler = () => {
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        isAtWatchlist: !this._film.isAtWatchlist,
      }));
    };

    const watchedButtonClickHandler = () => {
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        isWatched: !this._film.isWatched,
      }));
    };

    const favoriteButtonClickHandler = () => {
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        isFavorite: !this._film.isFavorite,
      }));
    };

    const emojiClickHandler = (evt) => {
      const emojiContainer = this._popupComponent.getEmojiContainer();
      const emojiElement = this._popupComponent
        .getElement()
        .querySelector(`[for="${evt.target.id}"] img`)
        .cloneNode(true);

      emojiElement.width = EMOJI_WIDTH;
      emojiElement.height = EMOJI_HEIGHT;

      if (emojiContainer.innerHTML !== ``) {
        emojiContainer.innerHTML = ``;
      }

      emojiContainer.appendChild(emojiElement);
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

    this._popupComponent.setCloseButtonClickHandler(this._closePopup);
    this._popupComponent.setWatchlistButtonClickHandler(watchlistButtonClickHandler);
    this._popupComponent.setWatchedButtonClickHandler(watchedButtonClickHandler);
    this._popupComponent.setFavoriteButtonClickHandler(favoriteButtonClickHandler);
    this._popupComponent.setEmojiClickHandler(emojiClickHandler);

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
