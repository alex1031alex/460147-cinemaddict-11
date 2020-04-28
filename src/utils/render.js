const PlaceForRender = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`,
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

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export {createElement, render};