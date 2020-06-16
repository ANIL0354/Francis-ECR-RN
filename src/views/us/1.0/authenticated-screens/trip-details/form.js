/* eslint-disable prettier/prettier */
import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import CustomFormInput from '../../../../../components/atoms/CustomFormInput';
import { STRINGS } from '../../../../../shared/constants/us/strings';
import { LABELS } from '../../../../../shared/constants';
import validator from './validator';
import { scaleText } from '../../../../../helpers';
import styles from './style';


const Form = ({
    emailTo,
    handleSubmit,
    onSubmit,
    onCancel
}) => {
    let bodyField = useRef();
    return (
        <TouchableWithoutFeedback onPress={(event) => {
            if (event.target === bodyField.current) {
                return;
            }
            else {
                Keyboard.dismiss();
            }
        }}>
            <View>
                <View style={[styles.flexOne, styles.verticalFiveMargin]}>
                    <Text style={styles.label}>{'Subject:'}</Text>
                    <Field
                        name={STRINGS.EMAIL_SUBJECT_NAME}
                        component={CustomFormInput}
                        placeholder={STRINGS.TYPE_SUBJECT_HERE}
                        returnKeyType={'next'}
                        takeErrorSpace={false}
                        style={styles.flexOne}
                    />
                </View>


                <View style={[styles.flexOne, styles.verticalFiveMargin]}>
                    <Text style={styles.label}>{'Body:'}</Text>
                    <View ref={bodyField}>
                        <Field
                            name={STRINGS.EMAIL_BODY_NAME}
                            component={CustomFormInput}
                            multiline={true}
                            returnKeyType={'go'}
                            takeErrorSpace={false}
                            placeholder={STRINGS.TYPE_HERE}
                            style={styles.flexOne}
                        />
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={[styles.changePasswordWrapper, { marginVertical: scaleText(20).fontSize }]}>
                        <TouchableOpacity
                            style={styles.changePasswordButton}
                            onPress={onCancel}>
                            <Text style={styles.basicBlueText}>{STRINGS.CANCEL}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.changePasswordWrapper, { marginVertical: scaleText(20).fontSize }]}>
                        <TouchableOpacity
                            style={styles.submitEditButton}
                            onPress={handleSubmit(onSubmit)}>
                            <Text style={styles.basicWhiteText}>{LABELS.sendEmail}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const mapStateToProps = (state, props) => {
    return {
    };
};

const reduxFormFunction = reduxForm({
    form: 'email_content',
    fields: ['old_password', 'new_password', 're_password'],
    validate: validator,
    enableReinitialize: true,
})(Form);

export const EmailForm = connect(mapStateToProps, null)(reduxFormFunction);
