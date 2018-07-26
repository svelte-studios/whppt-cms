import auth from '@/auth';
import Forbidden from 'Components/Error/403Forbidden';
import NotFound from 'Components/Error/404NotFound';
import Details from 'Components/Collection/Details';

import home from 'Components/home';
import modelList from 'Components/project/model/list';
import modelItem from 'Components/project/model/item';
import me from 'Components/Users/Details';
import projects from 'Components/project/list';
import project from 'Components/project/item';
import type from 'Components/project/type';

const secureRoute = (to, from, next) => {
  let user = JSON.parse(localStorage.getItem('user'));
  if (user) return next();
  return next({
    path: '/',
    query: { redirect: to.fullPath },
  });
};

// TODO: Remove the old component
const router = new VueRouter({
  // mode: 'history',
  routes: [
    { path: '/', name: 'Home', component: home },
    { path: '/me', name: 'me', component: me, beforeEnter: secureRoute },
    { path: '/projects', name: 'Projects', component: projects, beforeEnter: secureRoute },
    {
      path: '/project/:projectId',
      name: 'project',
      props: true,
      component: project,
      beforeEnter: secureRoute,
      children: [
        { path: '/403', name: '403', component: Forbidden },
        {
          path: '/project/:projectId/type/:type',
          name: 'type',
          component: type,
          children: [
            { path: '/project/:projectId/type/:type', name: 'models', component: modelList, props: true },
            { path: '/project/:projectId/type/:type/model/:id', name: 'model', component: modelItem, props: true },
          ]
        },
      ]
    },
    { path: '*', component: NotFound },
  ],
});

// router.redirect({
//   '*': '/',
// });
export default router;