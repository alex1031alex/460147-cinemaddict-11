import ProfileComponent from './components/profile.js';
import MenuComponent from './components/menu.js';
import FilterComponent from './components/filter.js';
import SortingComponent from './components/sorting.js';
import BoardComponent from './components/board.js';
import FilmComponent from './components/film.js';
import ShowMoreButtonComponent from './components/show-more-button.js';
import FilmPopupComponent from './components/film-popup.js';
import NoFilmsComponent from './components/no-films.js';
import StatCounterComponent from './components/stat-counter.js';
import StatComponent from './components/stat.js';
import {generateFilms} from './mock/film.js';
import {generateFilters} from './mock/filter.js';
import {getUserTitle} from './mock/profile.js';
import {render, remove, appendChildElement, removeChildElement} from './utils/render.js';

const TOTAL_MOVIE_COUNT = 20;
const INITIAL_MOVIE_COUNT = 5;
const MOVIE_COUNT_BY_BUTTON = 5;
const EXTRA_MOVIE_COUNT = 2;
const ESC_KEY_CODE = 27;
let movieShowingCount = INITIAL_MOVIE_COUNT;

/* Элементы страницы */
const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer__statistics`);

/* Данные */
const films = generateFilms(TOTAL_MOVIE_COUNT);
const watchedFilms = films.filter((film) => film.isWatched).length;
const filters = generateFilters(films);

/* функция отрисовки карточки фильма */
const renderFilmCard = (movieContainer, movie) => {
  const onEscKeyDown = (evt) => {
    if (evt.keyCode === ESC_KEY_CODE) {
      closePopup();
    }
  };
  
  const showPopup = () => {
    appendChildElement(movieContainer, popupComponent);
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const closePopup = () => {
    removeChildElement(movieContainer, popupComponent);
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  const filmCardComponent = new FilmComponent(movie);
  const popupComponent = new FilmPopupComponent(movie);

  filmCardComponent.setTitleClickHandler(showPopup);
  filmCardComponent.setPosterClickHandler(showPopup);
  filmCardComponent.setCommentsClickHandler(showPopup);
  popupComponent.setCloseButtonClickHandler(closePopup);

  render(movieContainer, filmCardComponent);
};

/* Функция отрисовки списка из нескольких фильмов */
const renderFilmCards = (container, movies) => {
  movies
    .forEach((movie) => {
      renderFilmCard(container, movie);
    });
};

/* Функция отрисовки доски с основным и дополнительными списками фильмов */
const renderBoard = (boardComponent, movies) => {
  const ratedMovieContainer = boardComponent.getRatedMovieContainer();
  const commentMovieContainer = boardComponent.getCommentMovieContainer();
  const topRatedShowingFilms = movies
    .sort((a, b) => b.rating - a.rating)
    .slice(0, EXTRA_MOVIE_COUNT);
  const mostCommentedShowingFilms = movies
    .sort((a, b) => b.comments.length - a.comments.length)
    .slice(0, EXTRA_MOVIE_COUNT);

  renderFilmCards(ratedMovieContainer, topRatedShowingFilms);
  renderFilmCards(commentMovieContainer, mostCommentedShowingFilms);

  const mainMovieContainer = boardComponent.getMainMovieContainer();
  const mainShowingFilms = movies.slice(0, INITIAL_MOVIE_COUNT);
  
  renderFilmCards(mainMovieContainer, mainShowingFilms);

  const showMoreButtonComponent = new ShowMoreButtonComponent();
  const showMoreButton = showMoreButtonComponent.getElement();

  render(mainMovieContainer, showMoreButtonComponent, `afterend`);

  showMoreButton.addEventListener(`click`, () => {
    const prevMovieCount = movieShowingCount;
    movieShowingCount += MOVIE_COUNT_BY_BUTTON;
    const showingFilms = movies.slice(prevMovieCount, movieShowingCount);
    renderFilmCards(mainMovieContainer, showingFilms);

    if (movieShowingCount >= movies.length) {
      remove(showMoreButtonComponent);
    }
  });

};

/* Отрисовка меню и профиля пользователя */
const menuComponent = new MenuComponent();

render(header, new ProfileComponent(getUserTitle(watchedFilms)));
render(main, menuComponent);

/* Отрисовка фильтров */
const filterContainer = menuComponent.getFilterContainer();

filters.forEach((filter, index) => {
  render(filterContainer, new FilterComponent(filter, index === 0));
});

/* Отрисовка сотрировки */
const sortingComponent = new SortingComponent();

render(main, sortingComponent);

/* Отрисовка доски со списками фильмов */
if (films.length > 0) {
  const boardComponent = new BoardComponent();

  render(main, boardComponent);
  renderBoard(boardComponent, films);
} else {
  const noFilmsComponent = new NoFilmsComponent();

  render(main, noFilmsComponent);
}

/* Отрисовка счётчика в подвале страницы */
render(footer, new StatCounterComponent(films.length));
