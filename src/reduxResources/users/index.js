import { reduxGenerator } from 'utils/reduxHelpers';

const { reducer, actions, selectors: usersSelectors } = reduxGenerator('users');

export {
  reducer,
  actions as usersActions,
  usersSelectors,
};
