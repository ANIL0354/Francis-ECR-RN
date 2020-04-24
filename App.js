import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import InternetCheckWrapper from './src/components/hoc/InternetCheckWrapper';

const {store, persistor} = require(`./src/redux/store`);
import RootNavigator from './src/navigator/1.0/root-navigator';

const App = () => {
  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <InternetCheckWrapper>
          <RootNavigator />
        </InternetCheckWrapper>
      </Provider>
    </PersistGate>
  );
};

export default App;
