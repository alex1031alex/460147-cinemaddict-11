import API from './api.js';
import {AUTHORIZATION, END_POINT} from './const.js';
import ProfileComponent from './components/profile.js';
import MenuComponent from './components/menu.js';
import BoardComponent from './components/board.js';
import LoadingComponent from './components/loading.js';
import NoFilmsComponent from './components/no-films.js';
import SortingComponent from './components/sorting.js';
import StatCounterComponent from './components/stat-counter.js';
import StatComponent from './components/stat.js';
import MoviesModel from './models/movies-model.js';
import {render, removeComponent} from './utils/render.js';
import PageController from './controllers/page-controller.js';
import FilterController from './controllers/filter-controller.js';

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer__statistics`);
const api = new API(AUTHORIZATION, END_POINT);
const moviesModel = new MoviesModel();
const menuComponent = new MenuComponent();
const filterContainer = menuComponent.getElement();
const filterController = new FilterController(filterContainer, moviesModel);
const sortingComponent = new SortingComponent();
const loadingComponent = new LoadingComponent();
const statComponent = new StatComponent();
const boardComponent = new BoardComponent();
const noFilmsComponent = new NoFilmsComponent();
const pageController = new PageController(boardComponent, moviesModel, api);

menuComponent.setStatsButtonClickHandler(() => {
  if (statComponent.checkVisibility()) {
    statComponent.hide();
    pageController.show();
  } else {
    pageController.hide();
    statComponent.show();
  }
});

render(main, menuComponent);
filterController.render();
render(main, sortingComponent);
render(main, loadingComponent);

api.getMovies()
  .then((data) => {
    moviesModel.setMovies(data);
    const movies = moviesModel.getMovies();
    const watchedMovies = movies.filter((movie) => movie.isWatched).length;

    removeComponent(sortingComponent);
    removeComponent(loadingComponent);
    render(header, new ProfileComponent(watchedMovies));

    if (movies.length > 0) {
      render(main, boardComponent);
      pageController.render(movies);
    } else {
      render(main, noFilmsComponent);
    }

    render(footer, new StatCounterComponent(moviesModel.getMovies().length));
    render(main, statComponent);
    statComponent.hide();
  });
