import {FilterType} from '../const.js';
import FilterComponent from '../components/filter.js';
import {PlaceForRender, render, replaceComponent} from '../utils/render.js';
import {getMoviesByFilter} from '../utils/filter.js';


export default class FilterController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._activeFilter = FilterType.ALL_MOVIES;
    this._filterComponent = null;
    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._moviesModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const allMovies = this._moviesModel.getMovies();
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        count: getMoviesByFilter(allMovies, filterType).length,
        checked: filterType === this._activeFilter,
      };
    });

    const oldComponent = this._filterComponent;

    this._filterComponent = new FilterComponent(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replaceComponent(this._filterComponent, oldComponent);
    } else {
      render(this._container, this._filterComponent, PlaceForRender.AFTERBEGIN);
    }
  }

  _onFilterChange(filterType) {
    this._moviesModel.setFilter(filterType);
    this._activeFilter = filterType;
  }

  _onDataChange() {
    this.render();
  }
}
