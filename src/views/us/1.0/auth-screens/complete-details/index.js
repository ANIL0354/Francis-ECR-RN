import { connect } from 'react-redux';
import { Screen } from "./screen";
import { completeProfile, stopLoader, fetchProfile, checkLogin } from '../../../../../redux/actions';

const mapStateToProps = (state) => {
    return ({
        profileData: state.CommonReducer.profileData,
    });
};
const mapDispatchToProps = (dispatch) => {
    return {
        completeProfile: (data, success, failure) => dispatch(completeProfile(data, success, failure)),
        fetchProfile: (success, failure) => dispatch(fetchProfile(success, failure)),
        checkLogin: (credentials, success, failure) => dispatch(checkLogin(credentials, success, failure)),
        stopLoader: () => dispatch(stopLoader())
    }
};
export const CompleteDetailsScreen = connect(mapStateToProps, mapDispatchToProps)(Screen);



