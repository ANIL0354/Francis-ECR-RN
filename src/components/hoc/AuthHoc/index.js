import React from 'react';
import { connect } from 'react-redux';
import { View, StatusBar, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import AppHeader from '../../atoms/AppHeader';
import { stopLoader } from '../../../redux/actions'
import CustomLoader from '../../atoms/Loader';

const AuthHoc = ({
    rightIcon,
    leftIcon,
    centerIcon,
    loader,
    stopLoader,
    children
}) => {
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        >
            <View style={{ flex: 1 }}>
                <StatusBar barStyle="light-content" />
                <SafeAreaView>
                    <AppHeader
                        rightIcon={rightIcon}
                        centerIcon={centerIcon}
                        leftIcon={leftIcon}
                    />
                    <CustomLoader stopLoader={stopLoader} loader={loader} />
                    {children}
                </SafeAreaView>
            </View>
        </KeyboardAvoidingView>
    );
};

const mapStateToProps = (state) => {
    return ({
        loader: state.CommonReducer.loader
    });
}
const mapDispatchToProps = (dispatch) => {
    return {
        stopLoader: () => dispatch(stopLoader())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AuthHoc);