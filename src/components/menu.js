const createFilterMarkup = (filter, isActive) => {
  const {name, count} = filter;
  const formattedName = name.replace(/^\w/, name[0].toUpperCase());
  return `<a href="#watchlist" class="main-navigation__item
${isActive ? `main-navigation__item--active` : ``}">
${formattedName}
  ${/all movies/i.test(formattedName) || count > 5 ? `` : `<span class="main-navigation__item-count">${count}</span>`}           
</a>`;
};

const createMenuTemplate = (filters) => {
  const filtersMarkup = filters.map((elem, index) => {
    return createFilterMarkup(elem, index === 0);
  }).join(`\n`);
  return `<nav class="main-navigation">
            <div class="main-navigation__items">
              ${filtersMarkup}
            </div>
            <a href="#stats" class="main-navigation__additional">Stats</a>
          </nav>`;
};

export {createMenuTemplate};
