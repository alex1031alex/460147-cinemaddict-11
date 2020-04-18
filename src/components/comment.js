import {formatDateTime} from './utils.js';

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

export {createCommentTemplate};
