const PlaceForRender = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`,
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (container, component, place = `beforeend`) => {
  switch (place) {
    case PlaceForRender.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case PlaceForRender.BEFOREEND:
      container.append(component.getElement());
      break;
    case PlaceForRender.AFTEREND:
      container.parentElement.append(component.getElement());
  }
};

const removeComponent = (component) => {
  component.getElement().remove();
  component.removeElement();
};

const appendChildComponent = (container, childComponent) => {
  container.appendChild(childComponent.getElement());
};

const removeChildElement = (container, childComponent) => {
  if (childComponent.getElement().parentElement === container) {
    container.removeChild(childComponent.getElement());
  }
};

const replaceComponent = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const areExistElements = !!(parentElement && newElement && oldElement);

  if (areExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

export {createElement, render, removeComponent, appendChildComponent, removeChildElement, replaceComponent};
