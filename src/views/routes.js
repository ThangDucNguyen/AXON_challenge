import asyncComponent from 'components/asyncComponent';
import { PATHS } from 'appConstants';

function createRoutes(context = '') {
  return [
    {
      path: '/',
      exact: true,
      component: asyncComponent(() => { return import('./Home'); }),
    },
    {
      path: `${PATHS.NOT_FOUND}`,
      component: asyncComponent(() => { return import('./Page404'); }),
    },
  ];
}

export { createRoutes };
