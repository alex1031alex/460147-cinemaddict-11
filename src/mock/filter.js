const generateFilters = (films) => {
  const filters = [
    {name: `all movies`,
     count: films.length,
    },
    {name: `watchlist`,
     count: films.filter((it) => {
       return it.isAtWatchlist;
     }).length,
    },
    {name: `history`,
     count: films.filter((it) => {
       return it.isWatched;
     }).length,
    },
    {name: `favorites`,
     count: films.filter((it) => {
       return it.isFavorites;
     }).length,
    }
  ];

  return filters;
}

export {generateFilters};