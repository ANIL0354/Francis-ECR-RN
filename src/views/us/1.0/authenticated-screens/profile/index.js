/* eslint-disable prettier/prettier */
import { connect } from 'react-redux';
import { Screen } from './screen';
import {
    startLoader,
    stopLoader,
    fetchProfile,
    completeProfile,
} from '../../../../../redux/actions';

const mapStateToProps = (state) => {
    return ({
        profileData: state.CommonReducer.profileData,
    });
};
const mapDispatchToProps = (dispatch) => {
    return {
        startLoader: () => dispatch(startLoader()),
        stopLoader: () => dispatch(stopLoader()),
        fetchProfile: (success, failure) => dispatch(fetchProfile(success, failure)),
        completeProfile: (data, success, failure) => dispatch(completeProfile(data, success, failure)),

    };
};
export const ProfileScreen = connect(mapStateToProps, mapDispatchToProps)(Screen);
