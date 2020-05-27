import AbstractComponent from './abstract-component.js';

export const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`,
};

const createSortingMarkup = (sortType, isActive) => {
  const activeClass = isActive ? `sort__button--active` : ``;

  return (
    `<li>
      <a href="#" data-sort-type="${sortType}" class="sort__button ${activeClass}">Sort by ${sortType}</a>
    </li>`
  );
};

const createSortingTemplate = (activeSortType) => {
  const sortTypes = Object.values(SortType);
  const sortingMarkup = sortTypes
    .map((sortType) => {
      return createSortingMarkup(sortType, sortType === activeSortType);
    })
    .join(`\n`);

  return (
    `<ul class="sort">
      ${sortingMarkup}
    </ul>`
  );
};

export default class Sorting extends AbstractComponent {
  constructor() {
    super();

    this._currentSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return createSortingTemplate(this._currentSortType);
  }

  getSortType() {
    return this._currentSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;

      handler(this._currentSortType);
    });
  }
}
