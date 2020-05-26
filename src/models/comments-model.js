import {getRandomNumber} from '../utils/common.js';
export default class CommentsModel {
  constructor() {
    this._comments = [];
    this._dataChangeHandlers = [];
  }

  getComments() {
    return this._comments;
  }

  setComments(comments) {
    comments.forEach((comment) => {
      this._comments.push(comment);
    });
    this._callHandlers(this._dataChangeHandlers);
  }

  addComment(comment) {
    const newComment = Object.assign({}, comment, {
      id: getRandomNumber(100, 25000),
      date: new Date(),
      author: `John Dow`,
    });

    this._comments = [].concat(this._comments, newComment);
    this._callHandlers(this._dataChangeHandlers);
  }

  deleteComment(id) {
    const index = this._comments.findIndex((comment) => comment.id === id);

    if (index === -1) {
      return false;
    }

    this._comments = [].concat(this._comments.slice(0, index), this._comments.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
