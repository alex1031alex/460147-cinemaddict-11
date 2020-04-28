import AbstractComponent from './abstract-component.js';

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

export default class Filter extends AbstractComponent {
  constructor(filter, isActive) {
    super();
    this._filter = filter;
    this._isActive = isActive;
  }

  getTemplate() {
    return createFilterTemplate(this._filter, this._isActive);
  }
}
