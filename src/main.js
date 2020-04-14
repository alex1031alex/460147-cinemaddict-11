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
import {generateComments} from './mock/comment.js';

const TOTAL_MOVIE_COUNT = 20;
const MAIN_MOVIE_COUNT = 5;
// const EXTRA_MOVIE_COUNT = 2; not ready yet
const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const films = generateFilms(TOTAL_MOVIE_COUNT);
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
  .slice(0, MAIN_MOVIE_COUNT)
  .forEach((film) => {
    render(mainMovieListElement, createMovieCardTemplate(film, generateComments()));
  });
render(mainMovieListElement, createShowMoreButtonTemplate(), `afterend`);

// const extraMovieListElements = mainElement.querySelectorAll(`.films-list--extra .films-list__container`);

// render(mainElement, createMovieDetailsTemplate(films[0]));
