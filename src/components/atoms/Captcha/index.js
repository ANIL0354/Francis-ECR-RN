import React from 'react';
import ConfirmGoogleCaptcha from 'react-native-google-recaptcha-v2';
import { View, Button } from 'react-native';
const siteKey = '6LfhcOcUAAAAAO7G3Aq53f25CKtbzwP2jcC_l27F';
const baseUrl = 'com.francis_ecr_rn';
class Captcha extends React.Component {
    onMessage = event => {
        if (event && event.nativeEvent.data) {
            if (['cancel', 'error', 'expired'].includes(event.nativeEvent.data)) {
                this.captchaForm.hide();
                return;
            } else {
                console.log('Verified code from Google', event.nativeEvent.data);
                setTimeout(() => {
                    this.captchaForm.hide();
                    // console.log()
                    // do what ever you want here
                }, 1500);
            }
        }
    };
    render() {
        return (
            <View >
                <ConfirmGoogleCaptcha
                    ref={_ref => this.captchaForm = _ref}
                    siteKey={siteKey}
                    baseUrl={baseUrl}
                    languageCode='en'
                    onMessage={this.onMessage}
                />
                <Button
                    onPress={() => {
                        this.captchaForm.show();
                    }}
                    title='Click'
                    style={{ width: 120, backgroundColor: 'darkviolet' }}
                    textColor='#fff'
                />
            </View>
        );
    }
};

export default Captcha;