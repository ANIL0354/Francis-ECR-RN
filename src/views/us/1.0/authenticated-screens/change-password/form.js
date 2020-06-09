/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import CustomFormInput from '../../../../../components/atoms/CustomFormInput';
import { STRINGS } from '../../../../../shared/constants/us/strings';
import validator from './validator';
import styles from './style';


const Form = ({
    handleSubmit,
    onSubmit,
}) => {
    return (
        <React.Fragment>
            <View style={[styles.flexOne, styles.verticalFiveMargin]}>
                <Text style={styles.label}>{'Current Password:'}</Text>
                <Field
                    name={STRINGS.CURRENT_INPUT_NAME}
                    component={CustomFormInput}
                    secureTextEntry={true}
                    returnKeyType={'go'}
                    takeErrorSpace={false}
                    placeholder={STRINGS.CURRENT_PASSWORD_PLACEHOLDER}
                    style={styles.flexOne}
                />
            </View>
            <View style={[styles.flexOne, styles.verticalFiveMargin]}>
                <Text style={styles.label}>{'New Password:'}</Text>
                <Field
                    name={STRINGS.NEW_PASSWORD_INPUT_NAME}
                    component={CustomFormInput}
                    secureTextEntry={true}
                    returnKeyType={'go'}
                    takeErrorSpace={false}
                    placeholder={STRINGS.NEW_PASSWORD_PLACEHOLDER}
                    style={styles.flexOne}
                />
            </View>
            <View style={[styles.flexOne, styles.verticalFiveMargin]}>
                <Text style={styles.label}>{'Re-enter new password:'}</Text>
                <Field
                    name={STRINGS.RE_PASSWORD_INPUT_NAME}
                    component={CustomFormInput}
                    secureTextEntry={true}
                    returnKeyType={'go'}
                    takeErrorSpace={false}
                    showEye={false}
                    placeholder={STRINGS.RE_NEW_PASSWORD_PLACEHOLDER}
                    style={styles.flexOne}
                />
            </View>
            <Button
                titleStyle={styles.loginSubmitTitle}
                buttonStyle={styles.submitButton}
                title={STRINGS.SAVE}
                onPress={handleSubmit(onSubmit)} />

        </React.Fragment>
    );
};

const mapStateToProps = (state, props) => {
    return {
    };
};

const reduxFormFunction = reduxForm({
    form: 'change_password',
    fields: ['old_password', 'new_password', 're_password'],
    validate: validator,
    enableReinitialize: true,
})(Form);

export const ChangePasswordForm = connect(mapStateToProps, null)(reduxFormFunction);
