import { Routes } from '@angular/router';

import { Layout } from './pages/layout/layout';
import { Home } from './pages/home/home';
import { Menu } from './pages/menu/menu';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        component: Home,
      },
      {
        path: 'menu',
        component: Menu,
      },
      {
        path: 'about',
        component: About,
      },
      {
        path: 'contact',
        component: Contact,
      },
    ],
  },
];
