import AbstractComponent from './abstract-component.js';

const createStatCounterTemplate = (filmsCount) => `<p>${filmsCount} movies inside</p>`;

export default class StatCounter extends AbstractComponent {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createStatCounterTemplate(this._films);
  }
}
