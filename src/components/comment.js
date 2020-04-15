const createCommentMarkup = (comment) => {
  const {emoji, date, author, message} = comment;
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const formattedDate = date.getDate() + 1;
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const fullCommentDate = `${year}/${month}/${formattedDate} ${hours}:${minutes}`;

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
    .map((comment) => createCommentMarkup(comment))
    .join(`\n`);
};

export {createCommentTemplate};
