import {createElement} from './utils.js';

const createStatCounterTemplate = (films) => `<p>${films.length} movies inside</p>`;

export default class StatCounter {
  constructor() {
    this._films = films;
    this._element = null;
  }

  getTemplate() {
    return createStatCounterTemplate(this._films);
  }

  getElement() {
    createElement(this.getTemplate());
  }

  removeElement() {
    this._element = null;
  }

}
