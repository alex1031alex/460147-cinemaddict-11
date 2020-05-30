import API from './api.js';
import {AUTHORIZATION} from './const.js';
import ProfileComponent from './components/profile.js';
import MenuComponent from './components/menu.js';
import BoardComponent from './components/board.js';
import NoFilmsComponent from './components/no-films.js';
import StatCounterComponent from './components/stat-counter.js';
import MoviesModel from './models/movies-model.js';
import {generateFilms} from './mock/film.js';
import {getUserTitle} from './mock/profile.js';
import {render} from './utils/render.js';
import PageController from './controllers/page-controller.js';
import FilterController from './controllers/filter-controller.js';

const TOTAL_MOVIE_COUNT = 20;

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer__statistics`);

const api = new API(AUTHORIZATION);

const moviesModel = new MoviesModel();

api.getMovies()
  .then((data) => {
    moviesModel.setMovies(data);
    const movies = moviesModel.getMovies();
    const watchedMovies = movies.filter((movie) => movie.isWatched).length;
    const menuComponent = new MenuComponent();
    
    render(header, new ProfileComponent(getUserTitle(watchedMovies)));
    render(main, menuComponent);
    
    const filterContainer = menuComponent.getElement();
    const filterController = new FilterController(filterContainer, moviesModel);
    filterController.render();
    
    if (movies.length > 0) {
      const boardComponent = new BoardComponent();
      const pageController = new PageController(boardComponent, moviesModel, api);
    
      render(main, boardComponent);
      pageController.render(movies);
    } else {
      const noFilmsComponent = new NoFilmsComponent();
    
      render(main, noFilmsComponent);
    }

    render(footer, new StatCounterComponent(moviesModel.getMovies().length));
  });
