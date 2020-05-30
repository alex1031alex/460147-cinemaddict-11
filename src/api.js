import MovieModel from './models/movie-model.js';

export default class API {
  constructor(authorization) {
    this._authorization = authorization;
  }

  getMovies() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/movies`, {headers})
      .then((response) => {
        const resp = response.json();
        // console.log(resp);
        return resp;
      })
      .then(MovieModel.parseMovies);
  }

  getComments(movieId) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/comments/${movieId}`, { headers })
      .then((response) => response.json());
    
  }
}
