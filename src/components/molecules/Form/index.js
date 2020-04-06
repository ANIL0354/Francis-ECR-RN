import React, { Children } from 'react';
import { View } from 'react-native';
import { Form } from 'react-native-elements;'

const CustomForm = ({
    children
}) => {
    return (
        <Form>
            {children}
        </Form>
    )
};

export default CustomForm;