import { ComponentType } from 'react';
import withPageTitle from 'components/PageTitle';
// import { dAppName } from 'config';
import Dashboard from 'pages/Dashboard';
import Login from 'pages/Login';
import Profile from 'pages/Profile';
import Register from 'pages/Register';
import Home from './pages/Home';

export interface RouteType {
  path: string;
  title: string;
  component: ComponentType;
}

export const routeNames = {
  home: '/',
  profile: '/profile',
  dashboard: '/dashboard',
  login: '/login',
  register: '/register'
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
  },
  {
    path: routeNames.login,
    title: 'Login',
    component: Login
    // authenticatedRoute: true
  },
  {
    path: routeNames.register,
    title: 'Register',
    component: Register
    // authenticatedRoute: true
  }
];

const mappedRoutes = routes.map((route) => {
  const title = route.title ? `${route.title}` : ` ${route.title}`;

  const wrappedComponent = withPageTitle(title, route.component);

  return {
    path: route.path,
    component: wrappedComponent
  };
});

export default mappedRoutes;
