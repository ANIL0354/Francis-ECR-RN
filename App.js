import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

const {
  store,
  persistor
} = require(`./src/redux/store`);
import RootNavigator from './src/navigator/1.0/root-navigator';

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <PersistGate persistor={persistor}>
        <Provider store={store}>
          <RootNavigator />
        </Provider>
      </PersistGate>
    </View>
  );
};


export default App;
