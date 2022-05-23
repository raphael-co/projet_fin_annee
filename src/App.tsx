import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Layout from 'components/Layout';
import PageNotFound from 'pages/PageNotFound';
import routes from 'routes';
import '@elrondnetwork/dapp-core/build/index.css';

interface AppContextInterface {
  langage: string;
  setLangage: any;
}
export const AppCtx = React.createContext<AppContextInterface | null>(null);

const App = () => {
  // const [langage, setLangage] = React.useState('fr');
  if (
    localStorage.getItem('langage') == null ||
    localStorage.getItem('flag') == null
  ) {
    localStorage.setItem('langage', 'en');
    localStorage.setItem(
      'flag',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Flag_of_the_United_Kingdom.svg/320px-Flag_of_the_United_Kingdom.svg.png'
    );
  }

  return (
    <Router>
      <Layout>
        <Routes>
          {routes.map((route: any, index: number) => (
            <Route
              path={route.path}
              key={'route-key-' + index}
              element={<route.component />}
            />
          ))}
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
