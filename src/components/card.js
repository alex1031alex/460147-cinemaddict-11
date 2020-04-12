const createMovieCardTemplate = (film) => {
  const {name, poster, description, comment, year, duration, genre, rating,
    isAtWhatchlist, isWatched, isFavorites } = film;

  const formattedGenre = genre.replace(/^\w/, genre[0].toUpperCase());
  const brief = description.length > 140 ? `${description.substring(0, 141)}...` : description;
    
  return `<article class="film-card">
            <h3 class="film-card__title">${name}</h3>
            <p class="film-card__rating">${rating % 1 === 0 ? `${rating}.0` : rating}</p>
            <p class="film-card__info">
              <span class="film-card__year">${year}</span>
              <span class="film-card__duration">${duration}</span>
              <span class="film-card__genre">${formattedGenre}</span>
            </p>
            <img src="./images/posters/${poster}" alt="" class="film-card__poster">
            <p class="film-card__description">
              ${brief}
            </p>
            <a class="film-card__comments">5 comments</a>
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
                ${isFavorites ? `film-card__controls-item--active` : ``}"
              >
                Mark as favorite
              </button>
            </form>
          </article>`
};

export {createMovieCardTemplate};
