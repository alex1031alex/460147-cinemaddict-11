import {createUserProfileTemplate} from './components/profile.js';
import {createMenuTemplate} from './components/menu.js';
import {createSortingTemplate} from './components/sorting.js';
import {createMovieBoardTemplate} from './components/board.js';
import {createMovieCardTemplate} from './components/film.js';
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
let movieShowingCount = INITIAL_MOVIE_COUNT;

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

const renderCards = (container, movies) => {
  movies
    .forEach((movie) => {
      render(container, createMovieCardTemplate(movie));
    });
};

render(header, createUserProfileTemplate(getUserTitle(watchedFilms)));
render(main, createMenuTemplate(filters));
render(main, createSortingTemplate());
render(main, createMovieBoardTemplate());

const mainMovieContainer = main.querySelector(`.films-list .films-list__container`);
const mainShowingFilms = films.slice(0, INITIAL_MOVIE_COUNT);
renderCards(mainMovieContainer, mainShowingFilms);

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
  const sortedFilms = films
    .sort((a, b) => b.details.releaseDate - a.details.releaseDate)
    .slice(0, movieShowingCount);
  mainMovieContainer.innerHTML = ``;
  renderCards(mainMovieContainer, sortedFilms);
});

sortByRatingButton.addEventListener(`click`, () => {
  const sortedFilms = films
    .sort((a, b) => b.rating - a.rating)
    .slice(0, movieShowingCount);
  mainMovieContainer.innerHTML = ``;
  renderCards(mainMovieContainer, sortedFilms);
});

sortByDefaultButton.addEventListener(`click`, () => {
  const sortedFilms = filmsByInitialOrder.slice(0, movieShowingCount);
  mainMovieContainer.innerHTML = ``;
  renderCards(mainMovieContainer, sortedFilms);
});

render(mainMovieContainer, createShowMoreButtonTemplate(), `afterend`);

const showMoreButton = main.querySelector(`.films-list__show-more`);

showMoreButton.addEventListener(`click`, () => {
  const prevMovieCount = movieShowingCount;
  movieShowingCount += MOVIE_COUNT_BY_BUTTON;
  const showingFilms = films.slice(prevMovieCount, movieShowingCount);
  renderCards(mainMovieContainer, showingFilms);

  if (movieShowingCount >= films.length) {
    showMoreButton.remove();
  }
});

const ratedMovieContainer = document.querySelector(`.films-list__container--rate`);
const commentMovieContainer = document.querySelector(`.films-list__container--comment`);
const topRatedShowingFilms = films
  .sort((a, b) => b.rating - a.rating)
  .slice(0, EXTRA_MOVIE_COUNT);
const mostCommentedShowingFilms = films
  .sort((a, b) => b.comments.length - a.comments.length)
  .slice(0, EXTRA_MOVIE_COUNT);

renderCards(ratedMovieContainer, topRatedShowingFilms);
renderCards(commentMovieContainer, mostCommentedShowingFilms);

render(footer, createStatCounterTemplate(films));

render(main, createMovieDetailsTemplate(films[0]));

const statsButton = document.querySelector(`.main-navigation__additional`);

statsButton.addEventListener(`click`, () => {
  const sortingList = document.querySelector(`.sort`);
  const filmsList = document.querySelector(`.films`);

  sortingList.remove();
  filmsList.remove();

  render(main, creatStatTemplate());
});
