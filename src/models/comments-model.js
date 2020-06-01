export default class CommentsModel {
  constructor() {
    this._comments = [];
  }

  getComments() {
    return this._comments;
  }

  getCommentsIds() {
    return this._comments.map((comment) => comment.id);
  }

  setComments(comments) {
    this._comments = comments.slice();
    return true;
  }

  deleteComment(id) {
    const index = this._comments.findIndex((comment) => comment.id === id);

    if (index > -1) {
      this._comments = [].concat(this._comments.slice(0, index), this._comments.slice(index + 1));
      return true;
    }

    return false;
  }
}
