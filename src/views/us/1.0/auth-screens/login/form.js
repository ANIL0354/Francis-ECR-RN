import React from "react";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import SimpleCrypto from "simple-crypto-js";
import { connect } from 'react-redux';
import "./style.scss";


const LoginForm = ({
    handleSubmit = () => { },
    rememberChecked,
    onRememberChange = () => { },
    onSubmit = () => { }
}) => {
    return (
        <Form onSubmit={
            handleSubmit(onSubmit)}>
            <div className="row">
                <Field
                    name={STRINGS.EMAIL_INPUT_NAME}
                    component={Input}
                    label={STRINGS.EMAIL_LABEL}
                    placeholder={STRINGS.EMAIL_PLACEHOLDER}
                    type={'text'}
                />
            </div>
            <div className="row">
                <Field
                    name={STRINGS.PASSWORD_INPUT_NAME}
                    component={Input}
                    label={STRINGS.PASSWORD_LABEL}
                    placeholder={STRINGS.PASSWORD_PLACEHOLDER}
                    config={{
                        type: "password"
                    }}
                    type={'password'}
                />
            </div>
            <div className="row">
                <Field
                    name={STRINGS.REMEMBER_ME}
                    component={Checkbox}
                    text={STRINGS.REMEMBER_ME}
                    config={{
                        onChange: event => onRememberChange(event.target.checked),
                        checked: rememberChecked
                    }}
                />
                <Link
                    className="col-sm-6 auth-link text-sm-right"
                    to={ROUTES.FORGOT_PASSWORD}
                >
                    {STRINGS.FORGOT_PASSWORD}
                </Link>
            </div>
            <InputSubmit buttonLabel={STRINGS.BUTTON_LABEL_LOGIN} buttonStyle={"float-sm-right mt-3"} />
        </Form>
    );
};

const mapStateToProps = (state, props) => {
    var _secretKey = "some-unique-key";
    var simpleCrypto = new SimpleCrypto(_secretKey);
    return {
        initialValues: props.credentials
            ? props.credentials
            : state.CommonReducer.rememberCredentials.password
                ? {
                    ...state.CommonReducer.rememberCredentials,
                    password: simpleCrypto.decrypt(state.CommonReducer.rememberCredentials.password)
                }
                : state.CommonReducer.rememberCredentials
    };
}

const reduxFormFunction = reduxForm({
    form: "login",
    fields: ['email', 'password'],
    onSubmitFail,
    validate: validator,
    enableReinitialize: true
})(LoginForm);

export const LoginReduxForm = connect(mapStateToProps, null)(reduxFormFunction);