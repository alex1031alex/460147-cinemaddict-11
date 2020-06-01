import {formatDateTime} from '../utils/common.js';
import AbstractComponent from './abstract-component.js';
import {encode} from 'he';
import {capitalizeFirstSymbol} from '../utils/common.js';

const DeleteButtonText = {
  DELETE: `Delete`,
  DELETING: `Deleting...`
}

const createCommentTemplate = (data, isDeletingMode) => {
  const {emotion, date, author, comment} = data;
  const encodedMessage = encode(capitalizeFirstSymbol(comment));
  const fullCommentDate = formatDateTime(new Date(date));
  const deleteButtonText = isDeletingMode ? DeleteButtonText.DELETING : DeleteButtonText.DELETE;
  const disabledAttribute = isDeletingMode ? `disabled="true"` : ``;

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${encodedMessage}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${fullCommentDate}</span>
          <button class="film-details__comment-delete" ${disabledAttribute}>${deleteButtonText}</button>
        </p>
      </div>
    </li>`
  );
};

export default class Comment extends AbstractComponent {
  constructor(comment, isDeletingMode = false) {
    super();
    this._comment = comment;
    this._isDeletingMode = isDeletingMode;
  }

  getTemplate() {
    return createCommentTemplate(this._comment, this._isDeletingMode);
  }

  setDeleteButtonHandler(handler) {
    const deleteButton = this.getElement().querySelector(`.film-details__comment-delete`);
    deleteButton.addEventListener(`click`, handler);
  }

  getCommentId() {
    return this._comment.id;
  }
}
