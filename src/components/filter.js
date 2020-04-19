import {createElement} from './utils.js';

const createFilterTemplate = (filter, isActive) => {
  const {name, count} = filter;
  const activeClass = isActive ? `main-navigation__item--active` : ``;
  const countToShow = count > 5 || count === 0 ? `` : `<span class="main-navigation__item-count">${count}</span>`;

  return (
    `<a href="#${name}" class="main-navigation__item ${activeClass}">
      ${name}${countToShow}
    </a>`
  );
};

export default class Filter {
  constructor(filter, isActive) {
    this._filter = filter;
    this._isActive = isActive;
    this._element = null;
  }

  getTemplate() {
    return createFilterTemplate(this._filter, this._isActive);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}