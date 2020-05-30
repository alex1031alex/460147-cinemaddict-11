import {capitalizeFirstSymbol, formatDate, formatRuntime, formatRating} from '../utils/common.js';
import AbstractSmartComponent from './abstract-smart-component.js';

const EMOJI_WIDTH = 55;
const EMOJI_HEIGHT = 55;

const createMovieDetailsTemplate = (film) => {
  const {name, poster, description, runtime, genres, rating,
    isAtWatchlist, isWatched, isFavorite, commentsQuantity} = film;
  const {ageRating, originTitle, releaseDate, country, director, writers, actors} = film.details;
  const formattedGenres = genres.join(`, `);
  const formattedRating = formatRating(rating);
  const writersList = writers.join(`, `);
  const actorsList = actors.join(`, `);
  const formattedReleaseDate = formatDate(releaseDate);
  const genreOrGenres = genres.length > 1 ? `Genres` : `Genre`;
  const isWatchlistChecked = isAtWatchlist ? `checked` : ``;
  const isHistoryChecked = isWatched ? `checked` : ``;
  const isFavoriteChecked = isFavorite ? `checked` : ``;
  const formattedDescription  = capitalizeFirstSymbol(description);
  const formattedRuntime = formatRuntime(runtime);

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./${poster}" alt="">
              <p class="film-details__age">${ageRating}+</p>
            </div>
            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${name}</h3>
                  <p class="film-details__title-original">Original: ${originTitle}</p>
                </div>
                <div class="film-details__rating">
                  <p class="film-details__total-rating">
                    ${formattedRating}
                  </p>
                </div>
              </div>
              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writersList}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actorsList}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${formattedReleaseDate}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Run Time</td>
                  <td class="film-details__cell">${formattedRuntime}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">
                    ${genreOrGenres}
                  </td>
                  <td class="film-details__cell">
                    ${formattedGenres}
                  </td>
                </tr>
              </table>
              <p class="film-details__film-description">
                ${formattedDescription}
              </p>
            </div>
          </div>
          <section class="film-details__controls">
            <input
              type="checkbox"
              class="film-details__control-input 
              visually-hidden"
              id="watchlist"
              name="watchlist"
              ${isWatchlistChecked}
            >
            <label
              for="watchlist"
              class="film-details__control-label 
              film-details__control-label--watchlist"
            >
              Add to watchlist
            </label>
            <input
              type="checkbox"
              class="film-details__control-input 
              visually-hidden"
              id="watched"
              name="watched"
              ${isHistoryChecked}
            >
            <label
              for="watched"
              class="film-details__control-label 
              film-details__control-label--watched"
            >
              Already watched
            </label>
            <input
              type="checkbox"
              class="film-details__control-input visually-hidden"
              id="favorite"
              name="favorite"
              ${isFavoriteChecked}
            >
            <label
              for="favorite"
              class="film-details__control-label 
              film-details__control-label--favorite">
              Add to favorites
            </label>
          </section>
        </div>
        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">
              Comments <span class="film-details__comments-count">${commentsQuantity}</span>
            </h3>
            <ul class="film-details__comments-list">

            </ul>
            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label"></div>
              <label class="film-details__comment-label">
                <textarea
                  class="film-details__comment-input"
                  placeholder="Select reaction below and write comment here"
                  name="comment"
                >
                </textarea>
              </label>
              <div class="film-details__emoji-list">
                <input
                  class="film-details__emoji-item visually-hidden"
                  name="comment-emoji"
                  type="radio"
                  id="emoji-smile"
                  value="smile"
                >
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji" data-type="smile">
                </label>
                <input
                  class="film-details__emoji-item visually-hidden"
                  name="comment-emoji"
                  type="radio"
                  id="emoji-sleeping"
                  value="sleeping"
                >
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji" data-type="sleeping">
                </label>
                <input
                  class="film-details__emoji-item visually-hidden"
                  name="comment-emoji"
                  type="radio"
                  id="emoji-puke"
                  value="puke"
                >
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji" data-type="puke">
                </label>
                <input
                  class="film-details__emoji-item visually-hidden"
                  name="comment-emoji"
                  type="radio"
                  id="emoji-angry"
                  value="angry"
                >
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji" data-type="angry">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class FilmPopup extends AbstractSmartComponent {
  constructor(film, comments) {
    super();

    this._film = film;
    this._comments = comments;
    this._closeButtonClickHandler = null;
    this._watchlistButtonClickHandler = null;
    this._watchedButtonClickHandler = null;
    this._favoriteButtonClickHandler = null;
    this._emojiClickHandler = null;
  }

  getTemplate() {
    return createMovieDetailsTemplate(this._film, this._comments);
  }

  getComments() {
    return this._film.comments;
  }

  getCommentsList() {
    return this.getElement().querySelector(`.film-details__comments-list`);
  }

  getEmojiContainer() {
    return this.getElement().querySelector(`.film-details__add-emoji-label`);
  }

  getCommentTextInputElement() {
    return this.getElement().querySelector(`.film-details__comment-input`);
  }

  setCloseButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, handler);
    this._closeButtonClickHandler = handler;
  }

  setWatchlistButtonClickHandler(handler) {
    const button = this.getElement().querySelector(`#watchlist`);
    button.addEventListener(`click`, handler);
    this._watchlistButtonClickHandler = handler;
  }

  setWatchedButtonClickHandler(handler) {
    const button = this.getElement().querySelector(`#watched`);
    button.addEventListener(`click`, handler);
    this._watchedButtonClickHandler = handler;
  }

  setFavoriteButtonClickHandler(handler) {
    const button = this.getElement().querySelector(`#favorite`);
    button.addEventListener(`click`, handler);
    this._favoriteButtonClickHandler = handler;
  }

  setEmojiById(id) {
    const emojiContainer = this.getElement().querySelector(`.film-details__add-emoji-label`);
    const emojiElement = this.getElement().querySelector(`[for="${id}"] img`).cloneNode(true);

    emojiElement.width = EMOJI_WIDTH;
    emojiElement.height = EMOJI_HEIGHT;

    if (emojiContainer.innerHTML !== ``) {
      emojiContainer.innerHTML = ``;
    }

    emojiContainer.appendChild(emojiElement);
  }

  setEmojiClickHandler(handler) {
    const emojis = this.getElement().querySelectorAll(`.film-details__emoji-item`);

    emojis.forEach((it) => {
      it.addEventListener(`change`, handler);
    });

    this._emojiClickHandler = handler;
  }
}
