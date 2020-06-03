/* eslint-disable prettier/prettier */
import React from 'react';
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
            <Field
                name={STRINGS.CURRENT_INPUT_NAME}
                component={CustomFormInput}
                secureTextEntry={true}
                returnKeyType={'go'}
                placeholder={STRINGS.CURRENT_PASSWORD_PLACEHOLDER}
                style={styles.flexOne}
            />
            <Field
                name={STRINGS.PASSWORD_INPUT_NAME}
                component={CustomFormInput}
                secureTextEntry={true}
                returnKeyType={'go'}
                placeholder={STRINGS.LOGIN_PASSWORD_PLACEHOLDER}
                style={styles.flexOne}
            />
            <Field
                name={STRINGS.RE_PASSWORD_INPUT_NAME}
                component={CustomFormInput}
                secureTextEntry={true}
                returnKeyType={'go'}
                placeholder={STRINGS.LOGIN_PASSWORD_PLACEHOLDER}
                style={styles.flexOne}
            />
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
