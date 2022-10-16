import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import { store } from './store';
import { Navigator } from './navigations';

const persistor = persistStore(store);

const App = (): JSX.Element => {
  return (
    <Provider {...{ store }}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
