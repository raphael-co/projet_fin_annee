import { ComponentType } from 'react';
import withPageTitle from 'components/PageTitle';
// import { dAppName } from 'config';
import Dashboard from 'pages/Dashboard';
import Profile from 'pages/Profile';
import Home from './pages/Home';

export interface RouteType {
  path: string;
  title: string;
  authenticatedRoute?: boolean;
  component: ComponentType;
}

export const routeNames = {
  home: '/',
  profile: '/profile',
  dashboard: '/dashboard',
  presale: '/presale',
  presaleAdmin: '/presaleAdmin',
  rewards: '/rewards',
  tokenomics: '/tokenomics',
  transaction: '/transaction',
  unlock: '/unlock',
  ledger: '/ledger',
  walletconnect: '/walletconnect',
  admin: '/admin'
};

const routes: Array<RouteType> = [
  {
    path: routeNames.home,
    title: 'Home',
    component: Home
  },
  {
    path: routeNames.dashboard,
    title: 'Dashboard',
    component: Dashboard
    // authenticatedRoute: true
  },
  {
    path: routeNames.profile,
    title: 'Profile',
    component: Profile
    // authenticatedRoute: true
  }
];

const mappedRoutes = routes.map((route) => {
  const title = route.title ? `${route.title}` : ` ${route.title}`;

  const requiresAuth = Boolean(route.authenticatedRoute);
  const wrappedComponent = withPageTitle(title, route.component);

  return {
    path: route.path,
    component: wrappedComponent,
    authenticatedRoute: requiresAuth
  };
});

export default mappedRoutes;
