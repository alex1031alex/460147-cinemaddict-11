export default class MovieModel {
  constructor(data) {
    this.details = {};
    this.id = data[`id`];
    this.name = data[`film_info`][`title`];
    this.poster = data[`film_info`].poster;
    this.description = data[`film_info`].description;
    this.runtime = data[`film_info`].runtime;
    this.genres = data[`film_info`].genre;
    this.rating = data[`film_info`][`total_rating`];
    this.comments = data.comments;
    this.commentsQuantity = data.comments.length;
    this.isAtWatchlist = data[`user_details`].watchlist;
    this.isWatched = data[`user_details`][`already_watched`];
    this.isFavorite = data[`user_details`].favorite;
    this.details.ageRating = data[`film_info`][`age_rating`];
    this.details.originTitle = data[`film_info`][`alternative_title`];
    this.details.releaseDate = new Date(data[`film_info`].release.date);
    this.year = this.details.releaseDate.getFullYear();
    this.details.country = data[`film_info`][`release`][`release_country`];
    this.details.director = data[`film_info`].director;
    this.details.writers = data[`film_info`].writers;
    this.details.actors = data[`film_info`].actors;
    this.watchingDate = data[`user_details`][`watching_date`];
  }

  toRAW() {
    return {
      id: this.id,
      comments: this.comments,
      [`film_info`]: {
        actors: this.details.actors,
        writers: this.details.writers,
        [`age_rating`]: this.details.ageRating,
        [`alternative_title`]: this.details.originTitle,
        description: this.description,
        director: this.details.director,
        genre: this.genres,
        poster: this.poster,
        release: {
          date: this.details.releaseDate.toISOString(),
          [`release_country`]: this.details.country,
        },
        runtime: this.runtime,
        title: this.name,
        [`total_rating`]: this.rating,
      },
      [`user_details`]: {
        watchlist: this.isAtWatchlist,
        [`already_watched`]: this.isWatched,
        favorite: this.isFavorite,
        [`watching_date`]: this.watchingDate,
      }
    };
  }

  static parseMovie(data) {
    return new MovieModel(data);
  }

  static parseMovies(data) {
    return data.map(MovieModel.parseMovie);
  }

  static clone(data) {
    return new MovieModel(data.toRAW());
  }
}
