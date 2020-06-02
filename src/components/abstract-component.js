import {createElement} from '../utils/render.js';
import {HIDDING_CLASS} from '../const.js';

export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate Abstract Component, only concrete one.`);
    }

    this._element = null;
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
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

  show() {
    if (this._element) {
      this._element.classList.remove(HIDDING_CLASS);
    }
  }

  hide() {
    if (this._element) {
      this._element.classList.add(HIDDING_CLASS);
    }
  } 
}
