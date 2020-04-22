import ProfileComponent from './components/profile.js';
import MenuComponent from './components/menu.js';
import FilterComponent from './components/filter.js';
import SortingComponent from './components/sorting.js';
import BoardComponent from './components/board.js';
import FilmComponent from './components/film.js';
import ShowMoreButtonComponent from './components/show-more-button.js';
import FilmDescriptionComponent from './components/filmDescription.js';
import StatCounterComponent from './components/stat-counter.js';
import StatComponent from './components/stat.js';
import {generateFilms} from './mock/film.js';
import {generateFilters} from './mock/filter.js';
import {getUserTitle} from './mock/profile.js';
import {render} from './components/utils.js';

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

const renderFilmCard = (movieContainer, movie) => {
  const showPopup = () => {
    movieContainer.appendChild(popupComponent.getElement());
  };

  const closePopup = () => {
    movieContainer.removeChild(popupComponent.getElement());
  };

  const filmCardComponent = new FilmComponent(movie);
  const flimCardTitle = filmCardComponent.getElement().querySelector(`.film-card__title`);
  const filmCardPoster = filmCardComponent.getElement().querySelector(`.film-card__poster`);
  const filmCardComments = filmCardComponent.getElement().querySelector(`.film-card__comments`);

  flimCardTitle.addEventListener(`click`, showPopup);
  filmCardPoster.addEventListener(`click`, showPopup);
  filmCardComments.addEventListener(`click`, showPopup);

  const popupComponent = new FilmDescriptionComponent(movie);
  const popupCloseButton = popupComponent.getElement().querySelector(`.film-details__close-btn`);

  popupCloseButton.addEventListener(`click`, closePopup);

  render(movieContainer, filmCardComponent.getElement());
};

const renderFilmCards = (container, movies) => {
  movies
    .forEach((movie) => {
      renderFilmCard(container, movie);
    });
};

render(header, new ProfileComponent(getUserTitle(watchedFilms)).getElement());
render(main, new MenuComponent().getElement());

const filterListElement = document.querySelector(`.main-navigation__items`);

filters.forEach((filter, index) => {
  render(filterListElement, new FilterComponent(filter, index === 0).getElement());
});

render(main, new SortingComponent().getElement());
render(main, new BoardComponent().getElement());

const mainMovieContainer = main.querySelector(`.films-list__container--main`);
const mainShowingFilms = films.slice(0, INITIAL_MOVIE_COUNT);

renderFilmCards(mainMovieContainer, mainShowingFilms);

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
  renderFilmCards(mainMovieContainer, sortedFilms);
});

sortByRatingButton.addEventListener(`click`, () => {
  const sortedFilms = films
    .sort((a, b) => b.rating - a.rating)
    .slice(0, movieShowingCount);
  mainMovieContainer.innerHTML = ``;
  renderFilmCards(mainMovieContainer, sortedFilms);
});

sortByDefaultButton.addEventListener(`click`, () => {
  const sortedFilms = filmsByInitialOrder.slice(0, movieShowingCount);
  mainMovieContainer.innerHTML = ``;
  renderFilmCards(mainMovieContainer, sortedFilms);
});

render(mainMovieContainer, new ShowMoreButtonComponent().getElement(), `afterend`);

const showMoreButton = main.querySelector(`.films-list__show-more`);

showMoreButton.addEventListener(`click`, () => {
  const prevMovieCount = movieShowingCount;
  movieShowingCount += MOVIE_COUNT_BY_BUTTON;
  const showingFilms = films.slice(prevMovieCount, movieShowingCount);
  renderFilmCards(mainMovieContainer, showingFilms);

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

renderFilmCards(ratedMovieContainer, topRatedShowingFilms);
renderFilmCards(commentMovieContainer, mostCommentedShowingFilms);

render(footer, new StatCounterComponent(films).getElement());

const statsButton = document.querySelector(`.main-navigation__additional`);

statsButton.addEventListener(`click`, () => {
  const sortingList = document.querySelector(`.sort`);
  const filmsList = document.querySelector(`.films`);

  sortingList.remove();
  filmsList.remove();

  render(main, new StatComponent().getElement());
});
