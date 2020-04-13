import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Button } from 'react-native-elements';
import AppHoc from '../../../../../components/hoc/AppHoc';
import { APP_LOGO, MENU_LOGO, USER_ICON, MAIL_ICON } from '../../../../../shared/constants';
import { scaleText } from '../../../../../helpers';
import { STRINGS } from '../../../../../shared/constants/us/strings';
import styles from "./style.js";


export const Screen = ({
    logout,
    userToken
}) => {
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState('');
    return (
        <AppHoc
            rightIcon={MENU_LOGO}
            leftIcon={APP_LOGO}
            centerIcon={USER_ICON}
        >
            <View style={styles.childContainer}>
                <View style={styles.childContainer}>
                    <Text
                        style={{
                            ...styles.subHeaderText,
                            height: Platform.OS == 'ios' ? scaleText(18).lineHeight + 2 : 'auto',
                            fontSize: scaleText(18).fontSize,
                            lineHeight: scaleText(18).lineHeight
                        }}>
                        {'Home Screen'}
                    </Text>
                </View>

            </View>
            <View>
                <Text style={{ textAlign: 'center', marginTop: 30 }}>{'Home screen content coming soon.'}</Text>
            </View>
            <Text style={{ backgroundColor: '#009000', maxWidth: 100, textAlign: 'center', color: 'white', minWidth: 100, marginVertical: 20, padding: 10, alignSelf: 'center' }}
                onPress={() => logout(userToken, () => { }, () => { })}>{STRINGS.LOGOUT}</Text>
        </AppHoc >
    );
}
