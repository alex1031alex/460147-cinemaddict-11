const PlaceForRender = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`,
};

const render = (container, element, place = `beforeend`) => {
  switch (place) {
    case PlaceForRender.AFTERBEGIN:
      container.prepend(element);
      break;
    case PlaceForRender.BEFOREEND:
      container.append(element);
      break;
    case PlaceForRender.AFTEREND:
      container.parentElement.append(element);
  }
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export {createElement, render};