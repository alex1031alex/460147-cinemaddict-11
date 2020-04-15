const generateFilters = (films) => {
  const filters = [
    {
      name: `all movies`,
      count: films.length,
    },
    {
      name: `watchlist`,
      count: films.filter((it) => it.isAtWatchlist).length,
    },
    {
      name: `history`,
      count: films.filter((it) => it.isWatched).length,
    },
    {
      name: `favorites`,
      count: films.filter((it) => it.isFavorites).length,
    }
  ];
  return filters;
};

export {generateFilters};
