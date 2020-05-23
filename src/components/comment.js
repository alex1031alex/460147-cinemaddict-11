import {formatDateTime} from '../utils/common.js';
import AbstractComponent from './abstract-component.js';

const createCommentTemplate = (comment) => {
  const {emoji, date, author, message} = comment;
  const fullCommentDate = formatDateTime(date);

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">
      </span>
      <div>
        <p class="film-details__comment-text">${message}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${fullCommentDate}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

export default class Comment extends AbstractComponent {
  constructor(comment) {
    super();
    this._comment = comment;
  }

  getTemplate() {
    return createCommentTemplate(this._comment);
  }

  setDeleteButtonHandler(handler) {
    const deleteButton = this.getElement().querySelector(`.film-details__comment-delete`);
    deleteButton.addEventListener(`click`, handler);
  }

  getCommentId() {
    return this._comment.id;
  }
}
