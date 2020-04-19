const createFilterMarkup = (filter, isActive) => {
  const {name, count} = filter;
  const activeClass = isActive ? `main-navigation__item--active` : ``;
  const countToShow = count > 5 || count === 0 ? `` : `<span class="main-navigation__item-count">${count}</span>`;

  return (
    `<a href="#${name}" class="main-navigation__item ${activeClass}">
      ${name}${countToShow}
    </a>`
  );
};

const createMenuTemplate = (filters) => {
  const filtersMarkup = filters
    .map((elem, index) => createFilterMarkup(elem, index === 0))
    .join(`\n`);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filtersMarkup}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export {createMenuTemplate};
