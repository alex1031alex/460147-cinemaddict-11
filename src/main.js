import {createUserProfileTemplate} from './components/profile.js';
import {createMenuTemplate} from './components/menu.js';
import {createSortingTemplate} from './components/sorting.js';
import {createMovieBoardTemplate} from './components/board.js';
import {createMovieCardTemplate} from './components/card.js';
import {createShowMoreButtonTemplate} from './components/show-more-button.js';
import {createMovieDetailsTemplate} from './components/details.js';
import {generateFilms} from './mock/film.js';
import {generateFilters} from './mock/filter.js';
import {getUserTitle} from './mock/profile.js';

const TOTAL_MOVIE_COUNT = 20;
const INITIAL_MOVIE_COUNT = 5;
const MOVIE_COUNT_BY_BUTTON = 5;
let movieShowing = INITIAL_MOVIE_COUNT;
// const EXTRA_MOVIE_COUNT = 2; not ready yet
const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const films = generateFilms(TOTAL_MOVIE_COUNT);
const filmsInitialList = films.slice();
const filters = generateFilters(films);
const watchedFilms = filters.find((it) => it.name === `watchlist`).count;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

render(headerElement, createUserProfileTemplate(getUserTitle(watchedFilms)));
render(mainElement, createMenuTemplate(filters));
render(mainElement, createSortingTemplate());
render(mainElement, createMovieBoardTemplate());

const mainMovieListElement = mainElement.querySelector(`.films-list .films-list__container`);

films
  .slice(0, INITIAL_MOVIE_COUNT)
  .forEach((film) => {
    render(mainMovieListElement, createMovieCardTemplate(film));
  });

const sortButtons = document.querySelectorAll(`.sort__button`);
const sortByDateButton = document.querySelector(`.sort__button--date`);
const sortByRatingButton = document.querySelector(`.sort__button--rating`);
const sortByDefaultButton = document.querySelector(`.sort__button--default`);

for (let button of sortButtons) {
  button.addEventListener(`click`, function () {
    const activeClass = `sort__button--active`;
    const activeButton = document.querySelector(`.${activeClass}`);
    activeButton.classList.remove(activeClass);
    this.classList.add(activeClass);
  });
}

sortByDateButton.addEventListener(`click`, () => {
  films.sort((a, b) => b.details.releaseDate - a.details.releaseDate);
  mainMovieListElement.innerHTML = ``;
  films
  .slice(0, movieShowing)
  .forEach((film) => {
    render(mainMovieListElement, createMovieCardTemplate(film));
  });
});

sortByRatingButton.addEventListener(`click`, () => {
  films.sort((a, b) => b.rating - a.rating);
  mainMovieListElement.innerHTML = ``;
  films
  .slice(0, movieShowing)
  .forEach((film) => {
    render(mainMovieListElement, createMovieCardTemplate(film));
  });
});

sortByDefaultButton.addEventListener(`click`, () => {
  mainMovieListElement.innerHTML = ``;
  filmsInitialList
  .slice(0, movieShowing)
  .forEach((film) => {
    render(mainMovieListElement, createMovieCardTemplate(film));
  });
});

render(mainMovieListElement, createShowMoreButtonTemplate(), `afterend`);
const showMoreButton = mainElement.querySelector(`.films-list__show-more`);

showMoreButton.addEventListener(`click`, () => {
  const prevMovieCount = movieShowing;
  movieShowing += MOVIE_COUNT_BY_BUTTON;

  films
    .slice(prevMovieCount, movieShowing)
    .forEach((film) => {
      render(mainMovieListElement, createMovieCardTemplate(film))
    });
  
  if (movieShowing >= films.length) {
    showMoreButton.remove();
  }
});
// const extraMovieListElements = mainElement.querySelectorAll(`.films-list--extra .films-list__container`);

// render(mainElement, createMovieDetailsTemplate(films[0]));
