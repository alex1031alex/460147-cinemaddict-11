import {capitalizeFirstSymbol, formatRating, formatDuration, cutText} from '../utils/common.js';
import AbstractComponent from './abstract-component.js';

const createMovieCardTemplate = (film) => {
  const {
    name,
    poster,
    description,
    year,
    duration,
    genres,
    rating,
    commentsQuantity,
    isAtWatchlist,
    isWatched,
    isFavorite,
  } = film;

  const formattedGenres = genres.join(`, `);
  const formattedRating = formatRating(rating);
  const brief = capitalizeFirstSymbol(cutText(description, 140));
  const commentOrComments = commentsQuantity === 1 ? `comment` : `comments`;
  const watchlistActiveClass = isAtWatchlist ? `film-card__controls-item--active` : ``;
  const historyActiveClass = isWatched ? `film-card__controls-item--active` : ``;
  const favoriteActiveClass = isFavorite ? `film-card__controls-item--active` : ``;
  const formattedDuration = formatDuration(duration);


  return (
    `<article class="film-card">
      <h3 class="film-card__title">${name}</h3>
      <p class="film-card__rating">${formattedRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${formattedDuration}</span>
        <span class="film-card__genre">${formattedGenres}</span>
      </p>
      <img src="./${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">
        ${brief}
      </p>
      <a class="film-card__comments">${commentsQuantity} ${commentOrComments} </a>
      <form class="film-card__controls">
        <button
          class="film-card__controls-item
          button
          film-card__controls-item--add-to-watchlist
          ${watchlistActiveClass}"
        >
          Add to watchlist
        </button>
        <button
          class="film-card__controls-item
          button
          film-card__controls-item--mark-as-watched
          ${historyActiveClass}"
        >
          Mark as watched
        </button>
        <button
          class="film-card__controls-item
          button
          film-card__controls-item--favorite
          ${favoriteActiveClass}"
        >
          Mark as favorite
        </button>
      </form>
    </article>`
  );
};

export default class Film extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createMovieCardTemplate(this._film);
  }

  setPopupOpenHandler(cb) {
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, cb);
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, cb);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, cb);
  }

  setWatchlistButtonClickHandler(handler) {
    const button = this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`);
    button.addEventListener(`click`, handler);
  }

  setWatchedButtonClickHandler(handler) {
    const button = this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`);
    button.addEventListener(`click`, handler);
  }

  setFavoriteButtonClickHandler(handler) {
    const button = this.getElement().querySelector(`.film-card__controls-item--favorite`);
    button.addEventListener(`click`, handler);
  }
}
