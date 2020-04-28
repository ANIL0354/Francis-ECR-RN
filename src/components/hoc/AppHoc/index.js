import React from 'react';
import { connect } from 'react-redux';
import { View, StatusBar, SafeAreaView } from 'react-native';
import AppHeader from '../../atoms/AppHeader';
import { stopLoader, logout } from '../../../redux/actions';
import CustomLoader from '../../atoms/Loader';

const AppHoc = ({
  rightIcon,
  leftIcon,
  centerIcon,
  loader,
  logout,
  userToken,
  stopLoader,
  children,
}) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <AppHeader
        rightIcon={rightIcon}
        centerIcon={centerIcon}
        leftIcon={leftIcon}
        onLogout={() => logout(
          userToken,
          () => { },
          () => { },
        )}
      />
      {children}
      {loader && (
        <View
          style={{
            flex: 1,
            position: 'absolute',
            alignItems: 'center',
            zIndex: 10000000000,
            justifyContent: 'center',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(255,255,255,0.8)',
          }}>
          <CustomLoader stopLoader={stopLoader} loader={loader} />
        </View>
      )}
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    loader: state.CommonReducer.loader,
    userToken: state.CommonReducer.userToken,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    stopLoader: () => dispatch(stopLoader()),
    logout: (token, success, failure) => dispatch(logout(token, success, failure)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AppHoc);
