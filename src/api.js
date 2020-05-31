import MovieModel from './models/movie-model.js';

export default class API {
  constructor(authorization) {
    this._authorization = authorization;
  }

  getMovies() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/movies`, {headers})
      .then((response) => response.json())
      .then(MovieModel.parseMovies);
  }

  getComments(movieId) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/comments/${movieId}`, {headers})
      .then((response) => response.json());
  }

  updateMovie(id, data) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    headers.append(`Content-Type`, `application/json`);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/movies/${id}`, {
      method: `PUT`,
      body: JSON.stringify(data.toRAW()),
      headers,
    })
      .then((response) => response.json())
      .then(MovieModel.parseMovie);
  }
}
