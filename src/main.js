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
import {createStatCounterTemplate} from './components/stat-counter.js';
import {creatStatTemplate} from './components/stat.js';

const TOTAL_MOVIE_COUNT = 20;
const INITIAL_MOVIE_COUNT = 5;
const MOVIE_COUNT_BY_BUTTON = 5;
const EXTRA_MOVIE_COUNT = 2;
let movieShowing = INITIAL_MOVIE_COUNT;

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer__statistics`);

const films = generateFilms(TOTAL_MOVIE_COUNT);
const filmsByInitialOrder = films.slice();
const filters = generateFilters(films);
const watchedFilms = films.filter((film) => film.isWatched).length;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

render(header, createUserProfileTemplate(getUserTitle(watchedFilms)));
render(main, createMenuTemplate(filters));
render(main, createSortingTemplate());
render(main, createMovieBoardTemplate());

const mainMovieContainer = main.querySelector(`.films-list .films-list__container`);

const renderList = (container, movieList, from = 0, till = INITIAL_MOVIE_COUNT, isClean = false) => {
  if (isClean) {
    container.innerHTML = ``;
  }
  movieList
    .slice(from, till)
    .forEach((movie) => {
      render(container, createMovieCardTemplate(movie));
    });
};

renderList(mainMovieContainer, films);

const sortButtons = document.querySelectorAll(`.sort__button`);
const sortByDateButton = document.querySelector(`.sort__button--date`);
const sortByRatingButton = document.querySelector(`.sort__button--rating`);
const sortByDefaultButton = document.querySelector(`.sort__button--default`);

for (let button of sortButtons) {
  button.addEventListener(`click`, () => {
    const activeClass = `sort__button--active`;
    const activeButton = document.querySelector(`.${activeClass}`);

    activeButton.classList.remove(activeClass);
    button.classList.add(activeClass);
  });
}

sortByDateButton.addEventListener(`click`, () => {
  films.sort((a, b) => b.details.releaseDate - a.details.releaseDate);
  renderList(mainMovieContainer, films, 0, movieShowing, true);
});

sortByRatingButton.addEventListener(`click`, () => {
  films.sort((a, b) => b.rating - a.rating);
  renderList(mainMovieContainer, films, 0, movieShowing, true);
});

sortByDefaultButton.addEventListener(`click`, () => {
  renderList(mainMovieContainer, filmsByInitialOrder, 0, movieShowing, true);
});

render(mainMovieContainer, createShowMoreButtonTemplate(), `afterend`);

const showMoreButton = main.querySelector(`.films-list__show-more`);

showMoreButton.addEventListener(`click`, () => {
  const prevMovieCount = movieShowing;
  movieShowing += MOVIE_COUNT_BY_BUTTON;
  renderList(mainMovieContainer, films, prevMovieCount, movieShowing);

  if (movieShowing >= films.length) {
    showMoreButton.remove();
  }
});

const ratedMovieContainer = document.querySelector(`.films-list__container--rate`);
const commentMovieContainer = document.querySelector(`.films-list__container--comment`);
const filmsByRating = films.slice().sort((a, b) => b.rating - a.rating);
const filmsByComment = films.slice().sort((a, b) => b.comments.length - a.comments.length);

renderList(ratedMovieContainer, filmsByRating, 0, EXTRA_MOVIE_COUNT);
renderList(commentMovieContainer, filmsByComment, 0, EXTRA_MOVIE_COUNT);

render(footer, createStatCounterTemplate());

// render(main, createMovieDetailsTemplate(films[0]));

const statsButton = document.querySelector(`.main-navigation__additional`);

statsButton.addEventListener(`click`, () => {
  const sortingList = document.querySelector(`.sort`);
  const filmsList = document.querySelector(`.films`);

  sortingList.remove();
  filmsList.remove();

  render(main, creatStatTemplate());
});
