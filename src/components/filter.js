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