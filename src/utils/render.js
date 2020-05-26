const PlaceForRender = {
  BEFOREBEGIN: `beforebegin`,
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
    case PlaceForRender.BEFOREBEGIN: {
      const parentElement = container.parentElement;
      const nextElement = container;
      container.remove();
      parentElement.append(component.getElement());
      parentElement.append(nextElement);
      break;
    }
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
  if (childComponent && container && childComponent.getElement().parentElement === container) {
    container.removeChild(childComponent.getElement());
  }
};

const replaceComponent = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElements = !!(parentElement && newElement && oldElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

export {
  PlaceForRender,
  createElement,
  render,
  removeComponent,
  appendChildComponent,
  removeChildElement,
  replaceComponent
};
