/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, StatusBar, SafeAreaView, Alert, Keyboard } from 'react-native';
import AppHeader from '../../atoms/AppHeader';
import { stopLoader, logout } from '../../../redux/actions';
import messaging from '@react-native-firebase/messaging';
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
  fromSummary = false,
  rideBooked = false,
  userToken,
  stopLoader,
  children,
  navigation,
}) => {
  useEffect(() => {
    if (loader) {
      Keyboard.dismiss();
    }
  }, [loader]);

  useEffect(() => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      if (userToken) {
        navigation.navigate(SCREENS.TRIP_DETAILS, { fromNotification: true, targetId: '5ed9e4270b4d885979062ae7', tripDetails: { _id: remoteMessage.data.listingId } });
      }
      else {
        navigation.navigate(SCREENS.LOGIN, { fromDetails: false });
      }
    });

    messaging().getInitialNotification().then(remoteMessage => {
      if (remoteMessage) {
        if (userToken) {
          navigation.navigate(SCREENS.TRIP_DETAILS, { fromNotification: true, targetId: '5ed9e4270b4d885979062ae7', tripDetails: { _id: remoteMessage.data.listingId } });
        }
        else {
          navigation.navigate(SCREENS.LOGIN, { fromDetails: false });

        }
      }
      else {
        return
      }
    }).catch(error => {
      console.log('error', error);
      navigation.navigate(SCREENS.HOME);
    });
  }, [])

  return (
    <SafeAreaView style={styles.hocWrapper}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <AppHeader
        rightIcon={rightIcon}
        centerIcon={userToken && centerIcon ? centerIcon : null}
        leftIcon={leftIcon}
        userToken={userToken}
        onLeftIconTap={() => {
          if (fromSummary && !rideBooked) {
            Alert.alert(fromSummary && !rideBooked ? 'Warning' : STRINGS.LOGOUT,
              fromSummary && !rideBooked ? 'You will loose all your data. Are you sure, you want to logout?' : STRINGS.LOGOUT_DESCRIPTION, [
              {
                text: STRINGS.CANCEL,
                onPress: () => { },
              },
              {
                text: fromSummary ? "Yes, I'm sure" : STRINGS.CONFIRM,
                onPress: () => logout(
                  userToken,
                  () => {
                    if (fromSummary || rideBooked) {
                      navigation.navigate(SCREENS.HOME);
                    }
                  },
                  () => {
                  },
                ),
              },
            ]);
          }
          else {
            navigation.navigate(SCREENS.HOME);
          }
        }}
        onCenterIconTap={() => {
          navigation.navigate(SCREENS.PROFILE);
        }}
        rightMenuItems={userToken
          ? [
            {
              label: 'Your Trips',
              onPress: () => navigation.navigate(SCREENS.YOUR_TRIPS),
            },
            {
              label: 'Your Ratings',
              onPress: () => navigation.navigate(SCREENS.YOUR_RATINGS),
            },
            {
              label: STRINGS.LOGOUT,
              onPress: () => Alert.alert(fromSummary && !rideBooked ? 'Warning' : STRINGS.LOGOUT,
                fromSummary && !rideBooked ? 'You will loose all your data. Are you sure, you want to logout?' : STRINGS.LOGOUT_DESCRIPTION, [
                {
                  text: STRINGS.CANCEL,
                  onPress: () => { },
                },
                {
                  text: fromSummary ? "Yes, I'm sure" : STRINGS.CONFIRM,
                  onPress: () => logout(
                    userToken,
                    () => {
                      navigation.navigate(SCREENS.HOME);
                    },
                    () => {
                    },
                  ),
                },
              ]),
            },
          ]
          : [
            {
              label: STRINGS.LOGIN_OR_SIGNUP,
              onPress: () => {
                stopLoader();
                navigation.navigate(SCREENS.LOGIN, { fromDetails: false });
              },
            },
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
