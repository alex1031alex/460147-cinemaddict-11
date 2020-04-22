import {createElement} from './utils.js';

const createStatCounterTemplate = (films) => `<p>${films.length} movies inside</p>`;

export default class StatCounter {
  constructor(films) {
    this._films = films;
    this._element = null;
  }

  getTemplate() {
    return createStatCounterTemplate(this._films);
  }

  getElement() {
    if(!this._element) {
      this._element = createElement(this.getTemplate());
    }
 
    return this._element;
  }

  removeElement() {
    this._element = null;
  }

}
