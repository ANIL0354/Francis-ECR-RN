import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, StatusBar, SafeAreaView, Alert, Keyboard } from 'react-native';
import AppHeader from '../../atoms/AppHeader';
import { stopLoader, logout } from '../../../redux/actions';
import CustomLoader from '../../atoms/Loader';
import { STRINGS } from '../../../shared/constants/us/strings';
import styles from './style';
import { SCREENS } from '../../../shared/constants';

const AppHoc = ({
  rightIcon,
  leftIcon,
  centerIcon,
  loader,
  logout,
  userToken,
  stopLoader,
  children,
  navigation
}) => {
  useEffect(() => {
    if (loader) {
      Keyboard.dismiss();
    }
  }, [loader])
  return (
    <SafeAreaView style={styles.hocWrapper}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <AppHeader
        rightIcon={rightIcon}
        centerIcon={centerIcon}
        leftIcon={leftIcon}
        userToken={userToken}
        rightMenuItems={userToken
          ? [
            {
              label: STRINGS.LOGOUT,
              onPress: () => Alert.alert(STRINGS.LOGOUT, STRINGS.LOGOUT_DESCRIPTION, [
                {
                  text: STRINGS.CANCEL,
                  onPress: () => { },
                },
                {
                  text: STRINGS.CONFIRM,
                  onPress: () => logout(
                    userToken,
                    () => { },
                    () => { },
                  )
                },
              ])
            }
          ]
          : [
            {
              label: STRINGS.LOGIN_OR_SIGNUP,
              onPress: () => {
                stopLoader();
                navigation.navigate(SCREENS.LOGIN)
              }
            }
          ]}
      />
      {children}
      {loader && (
        <View
          style={styles.loaderWrapper}>
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
