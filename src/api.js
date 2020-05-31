import MovieModel from './models/movie-model.js';
import CommentsModel from './models/comments-model.js';
import {Method} from './const.js';

const checkStatus = (response) => {
  if (response.status >= 200 && response.status <= 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class API {
  constructor(authorization, endPoint,) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }

  getMovies() {
    return this._load({url:`movies`})
      .then((response) => response.json())
      .then(MovieModel.parseMovies);
  }

  getComments(movieId) {
    return this._load({url:`comments/${movieId}`})
      .then((response) => response.json());
  }

  updateMovie(id, data) {
    return this._load({
      url: `movies/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json())
      .then(MovieModel.parseMovie);
  }

  addComment(movieId, localComment) {
    console.log(localComment);
    console.log(JSON.stringify(localComment));
    return this._load({
      url: `comments/${movieId}`,
      method: Method.POST,
      body: JSON.stringify(localComment),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json());
  }
}
