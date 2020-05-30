export default class MovieModel {
  constructor(data) {
    this.details = {};
    this.id = data[`id`];
    this.name = data[`film_info`][`title`];
    this.poster = data[`film_info`][`poster`];
    this.description = data[`film_info`][`description`];
    this.duration = data.film_info.runtime;
    this.genres = data[`film_info`][`genre`];
    this.rating = data[`film_info`][`total_rating`];
    this.commentsQuantity = data.comments.length;
    this.isWatchlist = data.user_details.watchlist;
    this.isWatched = data.user_details.watched;
    this.favorite = data.user_details.favorite;
    this.details.ageRating = data[`film_info`][`age_rating`];
    this.details.originalTitle = data.film_info.alternative_title;
    this.details.releaseDate = new Date(data.film_info.release.date);
    this.year = this.details.releaseDate.getFullYear();
    this.details.country = data.film_info.release.release_country;
    this.details.director = data.film_info.director;
    this.details.writers = data.film_info.writers;
    this.details.actors = data.film_info.actors; 
  }

  static parseMovie(data) {
    return new MovieModel(data);
  }

  static parseMovies(data) {
    console.log(data);
    return data.map(MovieModel.parseMovie);
  }
}
