import AbstractComponent from './abstract-component.js';

const createLoadingTemplate = () => (
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title">Loading...</h2>
      <div class="films-list__container films-list__container--main"></div>
    </section>
  </section>`
);

export default class Loading extends AbstractComponent {
  getTemplate() {
    return createLoadingTemplate();
  }
}