import React from 'react';
import { DappProvider, DappUI } from '@elrondnetwork/dapp-core';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Layout from 'components/Layout';
import { network, walletConnectBridge, walletConnectDeepLink } from 'config';
import { ContextProvider } from 'context';
import PageNotFound from 'pages/PageNotFound';
import { UnlockRoute } from 'pages/UnlockPage';
import { routeNames } from 'routes';
import routes from 'routes';
import '@elrondnetwork/dapp-core/build/index.css';

const {
  TransactionsToastList,
  SignTransactionsModals,
  NotificationModal
  //   DappCorePages: { UnlockPage }
} = DappUI;

interface AppContextInterface {
  langage: string;
  setLangage: any;
}
export const AppCtx = React.createContext<AppContextInterface | null>(null);

const App = () => {
  const [langage, setLangage] = React.useState('fr');
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

  const sampleAppContext: AppContextInterface = {
    langage: langage,
    setLangage: setLangage
  };

  return (
    <Router>
      <DappProvider
        environment={network.id}
        customNetworkConfig={{
          ...network,
          walletConnectBridge,
          walletConnectDeepLink
        }}
        completedTransactionsDelay={500}
      >
        <ContextProvider>
          <AppCtx.Provider value={sampleAppContext}>
            <Layout>
              <TransactionsToastList />
              <NotificationModal />
              <SignTransactionsModals className='custom-class-for-modals' />
              <Routes>
                <Route
                  path={routeNames.unlock}
                  // element={<UnlockPage loginRoute={routeNames.presale} />}
                  element={<UnlockRoute />}
                />
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
          </AppCtx.Provider>
        </ContextProvider>
      </DappProvider>
    </Router>
  );
};

export default App;
