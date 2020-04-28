import AbstractComponent from "./abstract-component";

const createMovieBoardTemplate = () => (
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container films-list__container--main"></div>
    </section>

    <section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container films-list__container--rate"></div>
    </section>

    <section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container films-list__container--comment"></div>
    </section>
  </section>`
);

export default class Board extends AbstractComponent {
  getTemplate() {
    return createMovieBoardTemplate();
  }

  getMainMovieContainer() {
   return this.getElement().querySelector(`.films-list__container--main`);
  }

  getRatedMovieContainer() {
    return this.getElement().querySelector(`.films-list__container--rate`);
  }

  getCommentMovieContainer() {
    return this.getElement().querySelector(`.films-list__container--comment`);
  }
}
