/* eslint-disable prettier/prettier */
import { connect } from 'react-redux';
import { Screen } from './screen';
import {
    startLoader,
    stopLoader,
    changePassword,
} from '../../../../../redux/actions';

const mapStateToProps = (state) => {
    return ({
    });
};
const mapDispatchToProps = (dispatch) => {
    return {
        startLoader: () => dispatch(startLoader()),
        stopLoader: () => dispatch(stopLoader()),
        changePassword: (data, success, failure) => dispatch(changePassword(data, success, failure)),
    };
};
export const ChangePasswordScreen = connect(mapStateToProps, mapDispatchToProps)(Screen);
