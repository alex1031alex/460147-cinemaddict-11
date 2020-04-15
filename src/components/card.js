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
  const brief = cutText(description, 140);

  return `<article class="film-card">
            <h3 class="film-card__title">${name}</h3>
            <p class="film-card__rating">${rating % 1 === 0 ? `${rating}.0` : rating}</p>
            <p class="film-card__info">
              <span class="film-card__year">${year}</span>
              <span class="film-card__duration">${duration}</span>
              <span class="film-card__genre">${formattedGenres}</span>
            </p>
            <img src="./images/posters/${poster}" alt="" class="film-card__poster">
            <p class="film-card__description">
              ${brief}
            </p>
            <a class="film-card__comments">${comments.length} ${comments.length === 1 ? `comment` : `comments`} </a>
            <form class="film-card__controls">
              <button
                class="film-card__controls-item
                button
                film-card__controls-item--add-to-watchlist
                ${isAtWhatchlist ? `film-card__controls-item--active` : ``}"
              >
                Add to watchlist
              </button>
              <button
                class="film-card__controls-item
                button
                film-card__controls-item--mark-as-watched
                ${isWatched ? `film-card__controls-item--active` : ``}"
              >
                Mark as watched
              </button>
              <button
                class="film-card__controls-item
                button
                film-card__controls-item--favorite
                ${isFavorite ? `film-card__controls-item--active` : ``}"
              >
                Mark as favorite
              </button>
            </form>
          </article>`;
};

export {createMovieCardTemplate};
