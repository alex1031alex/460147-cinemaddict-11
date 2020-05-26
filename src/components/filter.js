import AbstractComponent from './abstract-component.js';

const createFilterMarkup = (filter) => {
  const {name, count, checked} = filter;
  const activeClass = checked ? `main-navigation__item--active` : ``;
  const countToShow = name === `All movies` ? `` : `<span class="main-navigation__item-count">${count}</span>`;

  return (
    `<a href="#${name}" class="main-navigation__item ${activeClass}">
      ${name}${countToShow}
    </a>`
  );
};

const createFiltersTemplate = (filters) => {
  const filtersMarkup = filters
    .map((filter) => {
      return createFilterMarkup(filter);
    })
    .join(`\n`);

  return (
    `<div class="main-navigation__items">
      ${filtersMarkup}
    </div>`
  );
};

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    return createFiltersTemplate(this._filters);
  }

  setFilterChangeHandler(handler) {
    const filterButtons = this.getElement().querySelectorAll(`.main-navigation__item`);

    filterButtons.forEach((filterButton) => {
      const filterType = filterButton.firstChild.textContent.trim();
      filterButton.addEventListener(`click`, () => {
        handler(filterType);
      });
    });
  }
}
