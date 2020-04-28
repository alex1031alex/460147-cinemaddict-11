import AbstractComponent from './abstract-component.js';

const createMenuTemplate = () => (
  `<nav class="main-navigation">
    <div class="main-navigation__items"></div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`
);

export default class Menu extends AbstractComponent {
  getTemplate() {
    return createMenuTemplate();
  }

  getFilterContainer() {
    return this.getElement().querySelector(`.main-navigation__items`);
  }

  setStatsButtonClickHandler(cb) {
    this.getElement().querySelector(`.main-navigation__additional`).addEventListener(`click`, cb);
  }
}
