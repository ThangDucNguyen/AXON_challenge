import { createSelector } from 'reselect';

export const reducer = (state) => {
  return state || '';
};
export const selectLocale = (state) => { return state.get('locale'); };
export const localeSelector = createSelector(
  selectLocale,
  (locale) => { return locale; },
);
