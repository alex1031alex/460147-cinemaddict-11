import {formatDateTime, createElement} from './utils.js';

const createCommentMarkup = (comment) => {
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

const createCommentTemplate = (comments) => {
  return comments
    .map(createCommentMarkup)
    .join(`\n`);
};

export default class Comment {
  constructor(comment) {
    this._comment = comment;
    this._element = null;
  }

  getTemplate() {
    return createCommentMarkup(this._comment);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
};
