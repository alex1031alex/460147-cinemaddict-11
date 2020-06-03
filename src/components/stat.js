import AbstractSmartComponent from './abstract-smart-component.js';
import {HIDDING_CLASS} from '../const.js';
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

const MINUTES_IN_HOUR = 60;
const DAYS_IN_WEEK = 7;
const Interval = {
  ALL_TIME: `All time`,
  TODAY: `Today`,
  WEEK: `Week`,
  MONTH: `Month`,
  YEAR: `Year`
};

const idToInterval = {
  [`statistic-all-time`]: Interval.ALL_TIME,
  [`statistic-today`]: Interval.TODAY,
  [`statistic-week`]: Interval.WEEK,
  [`statistic-month`]: Interval.MONTH,
  [`statistic-year`]: Interval.YEAR
};

const getDateFrom = (interval) => {
  const today = new Date();
  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();

  switch (interval) {
    case (Interval.TODAY): {
      return today;
    }
    case (Interval.WEEK): {
      const weekAgoDate = today.getDate() - DAYS_IN_WEEK;

      return new Date(new Date().setDate(weekAgoDate));
    }
    case (Interval.MONTH): {
      return new Date(new Date().setMonth(--currentMonth));
    }
    case (Interval.YEAR): {
      return new Date(new Date().setFullYear(--currentYear));
    }
    default: {
      return null;
    }
  }
};

const getMoviesDuration = (movies) => {

  if (movies && movies.length > 0) {
    return movies
    .map((movie) => movie.runtime)
    .reduce((acc, currentValue) => acc + currentValue);
  } else {
    return 0;
  }
};

const getGenresStatistic = (movies) => {
  if (movies.length === 0) {
    return null;
  }

  let genres = [];

  movies.forEach((movie) => {
    genres = genres.concat(movie.genres);
  });

  const genresStatistic = {};

  genres.forEach((genre) => {
    if (genresStatistic[genre] !== undefined) {
      genresStatistic[genre]++;
    } else {
      genresStatistic[genre] = 1;
    }
  });

  return genresStatistic;
};

const getTopGenre = (genresStatistic) => {
  if (!genresStatistic) {
    return null;
  }

  const moviesInTopGenre = Math.max(...Object.values(genresStatistic));
  let topGenre = ``;
  for (let genre in genresStatistic) {
    if (genresStatistic[genre] === moviesInTopGenre) {
      topGenre = genre;
      break;
    }
  }

  return topGenre;
};

const getMoviesFromDate = (movies, dateFrom) => {
  if (!dateFrom) {
    return movies;
  }

  const dateTo = new Date();

  return movies.filter((movie) => {
    const watchingDate = new Date(movie.watchingDate);

    return watchingDate >= dateFrom && watchingDate <= dateTo;
  });
};

const renderChart = (genresStatistic) => {
  if (!genresStatistic) {
    return;
  }

  const BAR_HEIGHT = 50;
  const statisticCtx = document.querySelector(`.statistic__chart`);
  const labels = [];
  const count = [];

  Object.entries(genresStatistic)
    .sort((a, b) => b[1] - a[1])
    .forEach((it) => {
      labels.push(it[0]);
      count.push(it[1]);
    });

  const barCount = labels.length;

  // Обязательно рассчитайте высоту canvas, она зависит от количества элементов диаграммы
  statisticCtx.height = BAR_HEIGHT * barCount;

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels,
      datasets: [{
        data: count,
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

const creatStatTemplate = (movies, interval) => {
  const moviesCount = movies.length;
  const duration = getMoviesDuration(movies);
  const topGenre = getTopGenre(getGenresStatistic(movies));

  const hours = Math.trunc(duration / MINUTES_IN_HOUR);
  const minutes = duration % MINUTES_IN_HOUR;

  return `<section class="statistic">
          <p class="statistic__rank">
            Your rank
            <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
            <span class="statistic__rank-label">Sci-Fighter</span>
          </p>
          <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
            <p class="statistic__filters-description">Show stats:</p>
            <input 
              type="radio" 
              class="statistic__filters-input visually-hidden" 
              name="statistic-filter" 
              id="statistic-all-time" 
              value="all-time"
              ${idToInterval[`statistic-all-time`] === interval ? `checked` : ``}
            >
            <label for="statistic-all-time" class="statistic__filters-label">
              All time
            </label>
            <input 
              type="radio" 
              class="statistic__filters-input visually-hidden" 
              name="statistic-filter" 
              id="statistic-today" 
              value="today"
              ${idToInterval[`statistic-today`] === interval ? `checked` : ``}
              >
            <label for="statistic-today" class="statistic__filters-label">
              Today
            </label>
            <input 
              type="radio" 
              class="statistic__filters-input visually-hidden" 
              name="statistic-filter" 
              id="statistic-week" 
              value="week"
              ${idToInterval[`statistic-week`] === interval ? `checked` : ``}
            >
            <label for="statistic-week" class="statistic__filters-label">
              Week
            </label>
            <input 
              type="radio" 
              class="statistic__filters-input visually-hidden" 
              name="statistic-filter" 
              id="statistic-month" 
              value="month"
              ${idToInterval[`statistic-month`] === interval ? `checked` : ``}
            >
            <label for="statistic-month" class="statistic__filters-label">
              Month
            </label>
            <input 
              type="radio" 
              class="statistic__filters-input visually-hidden" 
              name="statistic-filter" 
              id="statistic-year" 
              value="year"
              ${idToInterval[`statistic-year`] === interval ? `checked` : ``}
            >
            <label for="statistic-year" class="statistic__filters-label">
              Year
            </label>
          </form>
          <ul class="statistic__text-list">
            <li class="statistic__text-item">
              <h4 class="statistic__item-title">You watched</h4>
              <p class="statistic__item-text">${moviesCount} <span class="statistic__item-description">movies</span></p>
            </li>
            <li class="statistic__text-item">
              <h4 class="statistic__item-title">Total duration</h4>
              <p class="statistic__item-text">
                ${hours} <span class="statistic__item-description">h</span> 
                ${minutes} <span class="statistic__item-description">m</span>
              </p>
            </li>
            <li class="statistic__text-item">
              <h4 class="statistic__item-title">Top genre</h4>
              <p class="statistic__item-text">${topGenre ? topGenre : ``}</p>
            </li>
          </ul>
          <div class="statistic__chart-wrap">
            <canvas class="statistic__chart" width="1000"></canvas>
          </div>
        </section>`;
};

export default class Stat extends AbstractSmartComponent {
  constructor(movies, interval = Interval.ALL_TIME) {
    super();

    this._chart = null;
    this._totalMovies = movies;
    this._movies = movies;
    this._interval = interval;
  }

  getTemplate() {
    return creatStatTemplate(this._movies, this._interval);
  }

  checkVisibility() {
    if (this.getElement().classList.contains(HIDDING_CLASS)) {
      return false;
    }

    return true;
  }

  onMovieChange(movies) {
    this._totalMovies = movies;
    this._movies = movies;
    this._interval = Interval.ALL_TIME;
  }

  _onStatFilterChange(evt) {
    if (evt.target.checked) {
      const interval = idToInterval[evt.target.id];
      const dateFrom = getDateFrom(interval);
      const filteredMovies = getMoviesFromDate(this._totalMovies, dateFrom);

      this._movies = filteredMovies;
      this._interval = interval;

      this.rerender();
    }
  }

  _setOnChangeIntervalHandler() {
    const menuItems = this.getElement().querySelectorAll(`.statistic__filters-input`);

    menuItems.forEach((menuItem) => {
      menuItem.addEventListener(`change`, (evt) => {
        this._onStatFilterChange(evt);
      });
    });
  }

  _resetChart() {
    if (this._chart) {
      this._chart.destroy();
      this._chart = null;
    }
  }

  rerender() {
    super.rerender();
    this._renderChart();
    this._setOnChangeIntervalHandler();
  }

  _renderChart() {
    const genresStatistic = getGenresStatistic(this._movies);

    this._resetChart();
    this._chart = renderChart(genresStatistic);
  }

  show() {
    super.show();

    this.rerender();
  }
}
