import AbstractComponent from './abstract-component.js';

export const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`,
};

const createSortingTemplate = () => (
  `<ul class="sort">
    <li>
      <a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button sort__button--default sort__button--active">Sort by default</a>
    </li>
    <li>
      <a href="#" data-sort-type="${SortType.DATE}" class="sort__button sort__button--date">Sort by date</a>
    </li>
    <li>
      <a href="#" data-sort-type="${SortType.RATING}" class="sort__button sort__button--rating">Sort by rating</a>
    </li>
  </ul>`
);

export default class Sorting extends AbstractComponent {
  constructor() {
    super();

    this._currentSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return createSortingTemplate();
  }

  getSortType() {
    return this._currentSortType;
  }

  setSortTypeChangeHandler(handler) {

  }
}
