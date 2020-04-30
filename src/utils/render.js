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
  container.removeChild(childComponent.getElement());
};

export {createElement, render, removeComponent, appendChildComponent, removeChildElement};
