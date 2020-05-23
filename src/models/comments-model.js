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
    this._comments = [].concat(this._comments, comment);
    this._callHandlers(this._dataChangeHandlers);
  }

  deleteComment(id) {
    console.log(this._comments);
    const index = this._comments.findIndex((comment) => comment.id === id );
    console.log(index);
    if (index === -1) {
      return false;
    }

    this._comments = [].concat(this._comments.slice(0, index), this._comments.slice(index + 1));
    console.log(this._comments);
    console.log(this._dataChangeHandlers);
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
