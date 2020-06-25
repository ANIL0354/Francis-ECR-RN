/* eslint-disable prettier/prettier */
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import CustomFormInput from '../../../../../components/atoms/CustomFormInput';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { DIVIDING_LINE, GOOGLE_ICON, FACEBOOK_ICON, LABELS } from '../../../../../shared/constants'
import { STRINGS } from '../../../../../shared/constants/us/strings';
import { scaleText } from '../../../../../helpers';
import validator from './validator';
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
            <Text style={styles.connectWithText}>{LABELS.orConnectWith}</Text>

            <View style={{
                flexDirection: 'row',
                padding: scaleText(10).fontSize,
            }}>
                <TouchableOpacity
                    onPress={googleAuth}
                    style={{
                        ...styles.googleButton,
                        padding: scaleText(10).fontSize,
                        marginRight: scaleText(20).fontSize,
                    }}>
                    <Image
                        source={GOOGLE_ICON}
                        style={{ marginRight: scaleText(5).fontSize }}
                        height={scaleText(30).fontSize}
                        width={scaleText(30).fontSize}
                    />
                    <View style={{ flex: 1, alignItems: 'center', }}>
                        <Text style={{
                            ...styles.socialButtonTitle,
                            fontSize: scaleText(13).fontSize,
                        }}>{LABELS.loginWith}</Text>
                        <Text style={{
                            ...styles.socialButtonTitle,
                            fontSize: scaleText(13).fontSize,
                        }}>{LABELS.google}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={facebookAuth}
                    style={{
                        ...styles.facebookButton,
                        padding: scaleText(10).fontSize,
                    }}>
                    <Image
                        source={FACEBOOK_ICON}
                        style={{ marginRight: scaleText(5).fontSize }}
                        height={scaleText(30).fontSize}
                        width={scaleText(30).fontSize}
                    />
                    <Text style={{
                        ...styles.socialButtonTitle,
                        fontSize: scaleText(13).fontSize,
                    }}>{LABELS.loginWithFacebook}</Text>
                </TouchableOpacity>
            </View>

            <Image source={DIVIDING_LINE} style={styles.dividingLine} />
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
};

const reduxFormFunction = reduxForm({
    form: 'login',
    fields: ['email', 'password'],
    validate: validator,
    enableReinitialize: true,
})(Form);

export const LoginForm = connect(mapStateToProps, null)(reduxFormFunction)