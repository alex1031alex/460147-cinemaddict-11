import FilmComponent from './../components/film.js';
import CommentComponent from './../components/comment.js';
import FilmPopupComponent from './../components/film-popup.js';
import {render, appendChildComponent, removeChildElement} from './../utils/render.js';

const ESC_KEY_CODE = 27;
const page = document.querySelector(`body`);

export default class MovieController {
  constructor(container) {
    this._container = container;
  }

  _renderComments(popup) {
    const comments = popup.getComments();
    const commentsList = popup.getCommentsList();
    comments.forEach((comment) => {
      const commentElement = new CommentComponent(comment);
      appendChildComponent(commentsList, commentElement);
    });
  }

  render(film) {
    const filmCardComponent = new FilmComponent(film);
    const popupComponent = new FilmPopupComponent(film);

    const showPopup = () => {
      this._renderComments(popupComponent);
      appendChildComponent(page, popupComponent);
      document.addEventListener(`keydown`, onEscKeyDown);
    };

    const closePopup = () => {
      removeChildElement(page, popupComponent);
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    const onEscKeyDown = (evt) => {
      if (evt.keyCode === ESC_KEY_CODE) {
        closePopup();
      }
    };

    filmCardComponent.setPopupOpenHandler(showPopup);
    popupComponent.setCloseButtonClickHandler(closePopup);

    render(this._container, filmCardComponent);
  }
}
