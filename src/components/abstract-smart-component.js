import AbstractComponent from './abstract-component.js';

export default class AbstractSmartComponent extends AbstractComponent {
  constructor() {
    super();

    if (new.target === AbstractSmartComponent) {
      throw new Error(`Can't instantiate Abstract Smart Component, only concrete one.`);
    }
  }

  rerender() {
    const oldElement = this.getElement();
    const parentElement = oldElement.parentElement;

    this.removeElement();

    const newElement = this.getElement();

    parentElement.replaceChild(newElement, oldElement);
  }
}
