import {createUserProfileTemplate} from './components/profile.js';
import {createMenuTemplate} from './components/menu.js';
import {createSortingTemplate} from './components/sorting.js';
import {createMovieBoardTemplate} from './components/board.js';
import {createMovieCardTemplate} from './components/card.js';
import {createShowMoreButtonTemplate} from './components/show-more-button.js';
import {createMovieDetailsTemplate} from './components/details.js';

const MAIN_MOVIE_COUNT = 5;
const EXTRA_MOVIE_COUNT = 2;
const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const renderList = (container, template, count) => {
  for (let i = 0; i < count; i++) {
    render(container, template);
  }
};

render(headerElement, createUserProfileTemplate());
render(mainElement, createMenuTemplate());
render(mainElement, createSortingTemplate());
render(mainElement, createMovieBoardTemplate());

const mainMovieListElement = mainElement.querySelector(`.films-list .films-list__container`);

renderList(mainMovieListElement, createMovieCardTemplate(), MAIN_MOVIE_COUNT);
render(mainMovieListElement, createShowMoreButtonTemplate(), `afterend`);

const extraMovieListElements = mainElement.querySelectorAll(`.films-list--extra .films-list__container`);

for (let element of extraMovieListElements) {
  renderList(element, createMovieCardTemplate(), EXTRA_MOVIE_COUNT);
}

render(mainElement, createMovieDetailsTemplate());
