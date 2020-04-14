import React from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from 'react-redux';
import validator from "./validator";
import { Button } from 'react-native-elements';
import CustomFormInput from '../../../../../components/atoms/CustomFormInput';
import { View, Text, Image, ScrollView } from "react-native";
import { DIVIDING_LINE, GOOGLE_ICON, FACEBOOK_ICON } from '../../../../../shared/constants'
import { STRINGS } from "../../../../../shared/constants/us/strings";
import styles from './style';


const Form = ({
    handleSubmit,
    socialLogin,
    googleAuth,
    facebookAuth,
    onSubmit,
}) => {
    return (
        <View>
            <Field
                name={STRINGS.EMAIL_INPUT_NAME}
                component={CustomFormInput}
                keyboardType={'email-address'}
                placeholder={STRINGS.LOGIN_EMAIL_PLACEHOLDER}
                returnKeyType={'next'}
            />
            <Field
                name={STRINGS.PASSWORD_INPUT_NAME}
                component={CustomFormInput}
                secureTextEntry={true}
                returnKeyType={'go'}
                placeholder={STRINGS.LOGIN_PASSWORD_PLACEHOLDER}
            />
            {/* <Captcha /> */}
            <Text style={{ textAlign: 'center', marginBottom: 20, marginTop: 5, color: 'black' }}>{'Or Connect with'}</Text>
            <View style={styles.socialButtonContainer}>
                <Button
                    icon={<Image source={GOOGLE_ICON} style={{ marginLeft: 10 }} height={50} width={50} />}
                    titleStyle={styles.googleButtonTitle}
                    iconContainerStyle={{ alignContent: 'flex-start', alignSelf: 'flex-start' }}
                    buttonStyle={styles.googleButton}
                    title={'Log In with Google'}
                    onPress={googleAuth} />
                <Button
                    icon={<Image source={FACEBOOK_ICON} style={{ marginLeft: 10 }} height={50} width={50} />}
                    titleStyle={styles.facebookButtonTitle}
                    iconContainerStyle={{ alignContent: 'flex-start', alignSelf: 'flex-start' }}
                    buttonStyle={styles.facebookButton}
                    title={'Log In with Facebook'}
                    onPress={facebookAuth} />

            </View>
            <Image source={DIVIDING_LINE} style={{ width: '100%', height: 1.5, marginVertical: 20 }} />
            <Button
                titleStyle={styles.loginSubmitTitle}
                buttonStyle={styles.loginSubmit}
                title={STRINGS.LOGIN} onPress={handleSubmit(onSubmit)} />

        </View>
    );
};

const mapStateToProps = (state, props) => {
    return {
    };
}

const reduxFormFunction = reduxForm({
    form: "login",
    fields: ['email', 'password'],
    validate: validator,
    enableReinitialize: true
})(Form);

export const LoginForm = connect(mapStateToProps, null)(reduxFormFunction);