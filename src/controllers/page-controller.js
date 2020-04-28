import FilmComponent from './../components/film.js';
import ShowMoreButtonComponent from './../components/show-more-button.js';
import FilmPopupComponent from './../components/film-popup.js';
import {render, remove, appendChildElement, removeChildElement} from './../utils/render.js';

const ESC_KEY_CODE = 27;
const MOVIE_COUNT_BY_BUTTON = 5;
const EXTRA_MOVIE_COUNT = 2;
const INITIAL_MOVIE_COUNT = 5;
let movieShowingCount = INITIAL_MOVIE_COUNT;

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

const renderFilmCards = (container, movies) => {
  movies
    .forEach((movie) => {
      renderFilmCard(container, movie);
    });
};

export default class PageController {
  constructor(container) {
    this._container = container;
    this._ratedMovieContainer = container.getRatedMovieContainer();
    this._commentMovieContainer = container.getCommentMovieContainer();
    this._mainMovieContainer = container.getMainMovieContainer();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
  }

  render(movies) {
    const topRatedShowingFilms = movies
      .sort((a, b) => b.rating - a.rating)
      .slice(0, EXTRA_MOVIE_COUNT);
    const mostCommentedShowingFilms = movies
      .sort((a, b) => b.comments.length - a.comments.length)
      .slice(0, EXTRA_MOVIE_COUNT);
    const mainShowingFilms = movies.slice(0, INITIAL_MOVIE_COUNT);

    renderFilmCards(this._ratedMovieContainer, topRatedShowingFilms);
    renderFilmCards(this._commentMovieContainer, mostCommentedShowingFilms);
    renderFilmCards(this._mainMovieContainer, mainShowingFilms);
  
    render(this._mainMovieContainer, this._showMoreButtonComponent, `afterend`);
  
    this._showMoreButtonComponent.setClickHandler(() => {
      const prevMovieCount = movieShowingCount;
      movieShowingCount += MOVIE_COUNT_BY_BUTTON;
      const showingFilms = movies.slice(prevMovieCount, movieShowingCount);
      renderFilmCards(this._mainMovieContainer, showingFilms);
  
      if (movieShowingCount >= movies.length) {
        remove(this._showMoreButtonComponent);
      }
    });
  }
}