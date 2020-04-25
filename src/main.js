import ProfileComponent from './components/profile.js';
import MenuComponent from './components/menu.js';
import FilterComponent from './components/filter.js';
import SortingComponent from './components/sorting.js';
import BoardComponent from './components/board.js';
import FilmComponent from './components/film.js';
import ShowMoreButtonComponent from './components/show-more-button.js';
import FilmPopupComponent from './components/film-popup.js';
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

  const onEscKeyDown = (evt) => {
    const ESC_KEY_CODE = 27;
  
    if (evt.keyCode === ESC_KEY_CODE) {
      closePopup();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const filmCardComponent = new FilmComponent(movie);
  const flimCardTitle = filmCardComponent.getTitleElement();
  const filmCardPoster = filmCardComponent.getPosterElement();
  const filmCardComments = filmCardComponent.getCommentsElement();

  flimCardTitle.addEventListener(`click`, showPopup);
  filmCardPoster.addEventListener(`click`, showPopup);
  filmCardComments.addEventListener(`click`, showPopup);

  const popupComponent = new FilmPopupComponent(movie);
  const popupCloseButton = popupComponent.getCloseButton();

  popupCloseButton.addEventListener(`click`, closePopup);
  document.addEventListener(`keydown`, onEscKeyDown);

  render(movieContainer, filmCardComponent.getElement());
};

const renderFilmCards = (container, movies) => {
  movies
    .forEach((movie) => {
      renderFilmCard(container, movie);
    });
};

const renderBoard = (boardComponent, movies ) => {
  const mainMovieContainer = boardComponent.getElement().querySelector(`.films-list__container--main`);
  const mainShowingFilms = movies.slice(0, INITIAL_MOVIE_COUNT);
  
  renderFilmCards(mainMovieContainer, mainShowingFilms);

  const showMoreButtonComponent = new ShowMoreButtonComponent();
  const showMoreButton = showMoreButtonComponent.getElement();

  render(mainMovieContainer, showMoreButtonComponent.getElement(), `afterend`);

  showMoreButton.addEventListener(`click`, () => {
    const prevMovieCount = movieShowingCount;
    movieShowingCount += MOVIE_COUNT_BY_BUTTON;
    const showingFilms = movies.slice(prevMovieCount, movieShowingCount);
    renderFilmCards(mainMovieContainer, showingFilms);
  
    if (movieShowingCount >= movies.length) {
      showMoreButton.remove();
    }
  });
  
  const ratedMovieContainer = boardComponent.getElement().querySelector(`.films-list__container--rate`);
  const commentMovieContainer = boardComponent.getElement().querySelector(`.films-list__container--comment`);
  const topRatedShowingFilms = movies
    .sort((a, b) => b.rating - a.rating)
    .slice(0, EXTRA_MOVIE_COUNT);
  const mostCommentedShowingFilms = movies
    .sort((a, b) => b.comments.length - a.comments.length)
    .slice(0, EXTRA_MOVIE_COUNT);
  
  renderFilmCards(ratedMovieContainer, topRatedShowingFilms);
  renderFilmCards(commentMovieContainer, mostCommentedShowingFilms);
};

render(header, new ProfileComponent(getUserTitle(watchedFilms)).getElement());
render(main, new MenuComponent().getElement());

const filterListElement = document.querySelector(`.main-navigation__items`);

filters.forEach((filter, index) => {
  render(filterListElement, new FilterComponent(filter, index === 0).getElement());
});

const sortingComponent = new SortingComponent();
const boardComponent = new BoardComponent();

render(main, sortingComponent.getElement());
render(main, boardComponent.getElement());
renderBoard(boardComponent, films);
render(footer, new StatCounterComponent(films.length).getElement());

const statsButton = document.querySelector(`.main-navigation__additional`);

statsButton.addEventListener(`click`, () => {
  const sortingList = document.querySelector(`.sort`);
  const filmsList = document.querySelector(`.films`);

  sortingList.remove();
  filmsList.remove();

  render(main, new StatComponent().getElement());
});
