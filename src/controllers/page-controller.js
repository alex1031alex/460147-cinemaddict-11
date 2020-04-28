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

export default class PageController {
  constructor(container) {
    this._container = container;
  }

  render() {

  }
}