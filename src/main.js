import ProfileComponent from './components/profile.js';
import MenuComponent from './components/menu.js';
import SortingComponent from './components/sorting.js';
import BoardComponent from './components/board.js';
import NoFilmsComponent from './components/no-films.js';
import StatCounterComponent from './components/stat-counter.js';
import MoviesModel from './models/movies.js';
import {generateFilms} from './mock/film.js';
import {getUserTitle} from './mock/profile.js';
import {render} from './utils/render.js';
import PageController from './controllers/page-controller.js';
import FilterController from './controllers/filter-controller.js';

const TOTAL_MOVIE_COUNT = 20;

/* Элементы страницы */
const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer__statistics`);

/* Данные */
const films = generateFilms(TOTAL_MOVIE_COUNT);

const watchedFilms = films.filter((film) => film.isWatched).length;

/* Создание модели */
const moviesModel = new MoviesModel();
moviesModel.setMovies(films);

/* Отрисовка меню и профиля пользователя */
const menuComponent = new MenuComponent();

render(header, new ProfileComponent(getUserTitle(watchedFilms)));
render(main, menuComponent);

/* Отрисовка фильтров */
const filterContainer = menuComponent.getElement();
const filterController = new FilterController(filterContainer, moviesModel);
filterController.render();

/* Отрисовка сотрировки */
const sortingComponent = new SortingComponent();

render(main, sortingComponent);

/* Отрисовка доски со списками фильмов */
if (films.length > 0) {
  const boardComponent = new BoardComponent();
  const pageController = new PageController(boardComponent, moviesModel);

  render(main, boardComponent);
  pageController.render(films);
} else {
  const noFilmsComponent = new NoFilmsComponent();

  render(main, noFilmsComponent);
}

/* Отрисовка счётчика в подвале страницы */
render(footer, new StatCounterComponent(moviesModel.getMovies().length));
