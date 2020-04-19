const generateFilters = (films) => {
  const filters = [
    {
      name: `All movies`,
      count: 0,
    },
    {
      name: `Watchlist`,
      count: films.filter((it) => it.isAtWatchlist).length,
    },
    {
      name: `History`,
      count: films.filter((it) => it.isWatched).length,
    },
    {
      name: `Favorites`,
      count: films.filter((it) => it.isFavorites).length,
    }
  ];

  return filters;
};

export {generateFilters};
