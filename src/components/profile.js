import AbstractComponent from './abstract-component.js';
import {UserTitle} from '../const.js';

const LEVEL_STEP = 10;

const createUserProfileTemplate = (userTitle) => (
  `<section class="header__profile profile">
    <p class="profile__rating">${userTitle}</p>
    <img
      class="profile__avatar"
      src="images/bitmap@2x.png"
      alt="Avatar" width="35"
      height="35"
    >
  </section>`
);

export default class Profile extends AbstractComponent {
  constructor(watchedFilmsCount) {
    super();
    this._watchedFilmsCount = watchedFilmsCount;
  }

  _getUserTitle(FilmsCount) {
    if (FilmsCount === 0) {
      return UserTitle.NO_TITLE;
    }

    if (FilmsCount <= LEVEL_STEP) {
      return UserTitle.NOVICE;
    }

    if (FilmsCount <= LEVEL_STEP + LEVEL_STEP) {
      return UserTitle.FAN;
    }

    return UserTitle.MOVIE_BUFF;
  }

  getTemplate() {
    return createUserProfileTemplate(this._getUserTitle(this._watchedFilmsCount));
  }
}
