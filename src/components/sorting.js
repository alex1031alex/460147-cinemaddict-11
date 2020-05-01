import AbstractComponent from './abstract-component.js';

const createSortingTemplate = () => (
  `<ul class="sort">
    <li>
      <a href="#" class="sort__button sort__button--default sort__button--active">Sort by default</a>
    </li>
    <li>
      <a href="#" class="sort__button sort__button--date">Sort by date</a>
    </li>
    <li>
      <a href="#" class="sort__button sort__button--rating">Sort by rating</a>
    </li>
  </ul>`
);

export default class Sorting extends AbstractComponent {
  getTemplate() {
    return createSortingTemplate();
  }

  getSortButtons() {
    return this.getElement().querySelectorAll(`.sort__button`);
  }

  getSortByDateButton() {
    return this.getElement().querySelector(`.sort__button--date`);
  }

  getSortByRatingButton() {
    return this.getElement().querySelector(`.sort__button--rating`);
  }

  getSortByDefaultButton() {
    return this.getElement().querySelector(`.sort__button--default`);
  }
}
