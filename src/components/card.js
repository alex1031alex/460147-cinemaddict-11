import {capitalizeWords, cutText} from './utils.js';

const createMovieCardTemplate = (film) => {
  const {
    name,
    poster,
    description,
    year,
    duration,
    genres,
    rating,
    comments,
    isAtWhatchlist,
    isWatched,
    isFavorite,
  } = film;

  const formattedGenres = capitalizeWords(genres).join(`, `);
  const formattedRating = rating % 1 === 0 ? `${rating}.0` : rating;
  const brief = cutText(description, 140);
  const commentOrComments = comments.length === 1 ? `comment` : `comments`;
  const watchlistActiveClass = isAtWhatchlist ? `film-card__controls-item--active` : ``;
  const historyActiveClass = isWatched ? `film-card__controls-item--active` : ``;
  const favoriteActiveClass = isFavorite ? `film-card__controls-item--active` : ``;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${name}</h3>
      <p class="film-card__rating">${formattedRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${formattedGenres}</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">
        ${brief}
      </p>
      <a class="film-card__comments">${comments.length} ${commentOrComments} </a>
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

export {createMovieCardTemplate};
