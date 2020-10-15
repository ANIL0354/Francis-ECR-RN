/* eslint-disable prettier/prettier */
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';
import { StackActions } from '@react-navigation/native';
import {
    APP_LOGO,
    MENU_LOGO,
    USER_ICON,
    NAV_ARROW_ICON,
    EDIT_ICON,
    LABELS,
    SCREENS,
    CHANGE_PASSWORD_LOCK,
} from '../../../../../shared/constants';
import { ChangePasswordForm } from './form';
import { scaleText } from '../../../../../helpers';
import AppHoc from '../../../../../components/hoc/AppHoc';
import styles from './style';

export const Screen = ({
    startLoader,
    stopLoader,
    navigation,
    changePassword,
    routes,
}) => {
    const largeScaledFont = scaleText(18);
    const popAction = StackActions.pop(2);
    return (
        <AppHoc
            rightIcon={MENU_LOGO}
            leftIcon={APP_LOGO}
            centerIcon={USER_ICON}
            navigation={navigation}
        >
            <ScrollView
                bounces={false}
                keyboardShouldPersistTaps="always"
                showsVerticalScrollIndicator={false}>
                <View
                    style={styles.screenHeaderWrapper}>
                    <View style={styles.childContainer}>
                        <TouchableOpacity
                            style={styles.navArrowContainer}
                            onPress={() => navigation.goBack()}
                            hitSlop={{ bottom: 10, left: 10, right: 10, top: 10 }}
                        >
                            <Image
                                source={NAV_ARROW_ICON}
                                height={20}
                                width={20}
                                style={styles.navArrow}
                            />
                        </TouchableOpacity>
                        <Text
                            style={{
                                ...styles.subHeaderText,
                                fontSize: largeScaledFont.fontSize,
                            }}>
                            {LABELS.changePassword}
                        </Text>
                    </View>
                </View>
                <View style={styles.detailsWrapper}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: scaleText(20).fontSize }}>
                        <Image
                            source={CHANGE_PASSWORD_LOCK}
                            height={20}
                            width={20}
                        />
                    </View>
                    <View style={{ flex: 1, paddingVertical: scaleText(20).fontSize }}>
                        <ChangePasswordForm
                            onSubmit={(formProps) => {
                                startLoader();
                                changePassword({
                                    currentPassword: formProps.currentPassword,
                                    newPassword: formProps.newPassword,
                                }, () => {
                                    stopLoader();
                                    navigation.dispatch(popAction);
                                }, () => {
                                    stopLoader();
                                });
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
        </AppHoc>
    )
};
