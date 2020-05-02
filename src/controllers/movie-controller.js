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
    const filmCardComponent = new FilmComponent(film);
    const popupComponent = new FilmPopupComponent(film);

    const showPopup = () => {
      this._renderComments(popupComponent);
      appendChildComponent(page, popupComponent);
      document.addEventListener(`keydown`, onEscKeyDown);
    };

    const closePopup = () => {
      removeChildElement(page, popupComponent);
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

    filmCardComponent.setPopupOpenHandler(showPopup);
    filmCardComponent.setWatchlistButtonClickHandler((evt) => {
      evt.preventDefault();
      watchlistButtonClickHandler();
    });

    filmCardComponent.setWatchedButtonClickHandler((evt) => {
      evt.preventDefault();
      watchedButtonClickHandler();
    });

    filmCardComponent.setFavoriteButtonClickHandler((evt) => {
      evt.preventDefault();
      favoriteButtonClickHandler();
    });

    popupComponent.setCloseButtonClickHandler(closePopup);
    popupComponent.setWatchlistButtonClickHandler(watchlistButtonClickHandler);
    popupComponent.setWatchedButtonClickHandler(watchedButtonClickHandler);
    popupComponent.setFavoriteButtonClickHandler(favoriteButtonClickHandler);

    render(this._container, filmCardComponent);
  }
}
