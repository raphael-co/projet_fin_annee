import { ComponentType } from 'react';
import { dAppName } from 'config';
import Dashboard from 'pages/Dashboard';
import Profile from 'pages/Profile';
import Rewards from 'pages/Rewards';
import Tokenomics from 'pages/Tokenomics';
import withPageTitle from './components/PageTitle';
import Admin from './pages/Admin';
import Home from './pages/Home';
import Presale from './pages/Presale';
import PresaleAdmin from './pages/PresaleAdmin';
import Transaction from './pages/Transaction';

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
    component: Dashboard,
    authenticatedRoute: true
  },
  {
    path: routeNames.profile,
    title: 'Profile',
    component: Profile,
    authenticatedRoute: true
  },
  {
    path: routeNames.admin,
    title: 'Admin',
    component: Admin
  },
  {
    path: routeNames.presale,
    title: 'Presale',
    component: Presale,
    authenticatedRoute: true
  },
  {
    path: routeNames.presaleAdmin,
    title: 'PresaleAdmin',
    component: PresaleAdmin,
    authenticatedRoute: true
  },
  {
    path: routeNames.rewards,
    title: 'Rewards',
    component: Rewards,
    authenticatedRoute: true
  },
  {
    path: routeNames.tokenomics,
    title: 'Tokenomics',
    component: Tokenomics,
    authenticatedRoute: false
  },
  {
    path: routeNames.transaction,
    title: 'Transaction',
    component: Transaction
  }
];

const mappedRoutes = routes.map((route) => {
  const title = route.title
    ? `${route.title} • Elrond ${dAppName}`
    : `Elrond ${dAppName}`;

  const requiresAuth = Boolean(route.authenticatedRoute);
  const wrappedComponent = withPageTitle(title, route.component);

  return {
    path: route.path,
    component: wrappedComponent,
    authenticatedRoute: requiresAuth
  };
});

export default mappedRoutes;
