import AbstractComponent from './abstract-component.js';

const createStatCounterTemplate = (filmsCount) => `<p>${filmsCount} movies inside</p>`;

export default class StatCounter extends AbstractComponent {
  constructor(filmsCount) {
    super();

    this._filmsCount = filmsCount;
  }

  getTemplate() {
    return createStatCounterTemplate(this._filmsCount);
  }
}
