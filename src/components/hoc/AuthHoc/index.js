import React from 'react';
import { connect } from 'react-redux';
import { View, StatusBar, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import AppHeader from '../../atoms/AppHeader';
import { stopLoader } from '../../../redux/actions'
import CustomLoader from '../../atoms/Loader';
import styles from './style';

const AuthHoc = ({
    rightIcon,
    leftIcon,
    centerIcon,
    loader,
    stopLoader,
    children
}) => {
    return (
        <SafeAreaView style={styles.authHocWrapper}>
            <StatusBar backgroundColor='white' barStyle="dark-content" />
            <AppHeader
                rightIcon={rightIcon ? rightIcon : null}
                centerIcon={centerIcon ? centerIcon : null}
                leftIcon={leftIcon ? leftIcon : null}
            />
            {children}
            {loader && <View style={styles.loaderContainer}>
                <CustomLoader stopLoader={stopLoader} loader={loader} />
            </View>}
        </SafeAreaView>
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