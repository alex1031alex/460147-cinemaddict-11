import {capitalizeWords, formatDate, formatRating} from '../utils/common.js';
import AbstractComponent from './abstract-component.js';
// import {createCommentTemplate} from './comment.js';

const createMovieDetailsTemplate = (film) => {
  const {name, poster, description, duration, genres, rating, comments,
    isAtWhatchlist, isWatched, isFavorite} = film;
  const {ageRating, originTitle, releaseDate, country, director, writers, actors} = film.details;
  const formattedGenres = capitalizeWords(genres)
  .map((it) => `<span class="film-details__genre">${it}</span>`)
  .join(`\n`);
  const formattedRating = formatRating(rating);
  const writersList = writers.join(`, `);
  const actorsList = actors.join(`, `);
  const formattedReleaseDate = formatDate(releaseDate);
  const genreOrGenres = genres.length > 1 ? `Genres` : `Genre`;
  const isWatchlistChecked = isAtWhatchlist ? `checked` : ``;
  const isHistoryChecked = isWatched ? `checked` : ``;
  const isFavoriteChecked = isFavorite ? `checked` : ``;
  const commentsQuantity = comments.length;
  // const commentTemplate = createCommentTemplate(comments);

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">
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
                  <td class="film-details__cell">${duration}</td>
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
                ${description}
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
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>
                <input
                  class="film-details__emoji-item visually-hidden"
                  name="comment-emoji"
                  type="radio"
                  id="emoji-sleeping"
                  value="sleeping"
                >
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>
                <input
                  class="film-details__emoji-item visually-hidden"
                  name="comment-emoji"
                  type="radio"
                  id="emoji-puke"
                  value="puke"
                >
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>
                <input
                  class="film-details__emoji-item visually-hidden"
                  name="comment-emoji"
                  type="radio"
                  id="emoji-angry"
                  value="angry"
                >
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class FilmPopup extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createMovieDetailsTemplate(this._film);
  }

  setCloseButtonClickHandler(cb) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, cb);
  }
}
