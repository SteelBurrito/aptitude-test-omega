import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import NoToken from './views/NoToken.vue';


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: About,
    },
    {
      path: '/aptitude-test/:token',
      component: Home,
      props: true,
    },
    {
      path: '/aptitude-test/',
      component: NoToken,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    // },
    // {
    //   path: '/aptitude-test',
    //   name: 'aptitude-test',
    //   component: AptitudeTest,
    // },
  ],
});
