import { connect } from 'react-redux';
import { Screen } from "./screen";
import { completeProfile, stopLoader, checkLogin } from '../../../../../redux/actions';

const mapStateToProps = (state) => {
    return ({
        userInfo: state.CommonReducer.userInfo
    });
}
const mapDispatchToProps = (dispatch) => {
    return {
        completeProfile: (data, success, failure) => dispatch(completeProfile(data, success, failure)),
        checkLogin: (credentials, success, failure) => dispatch(checkLogin(credentials, success, failure)),
        stopLoader: () => dispatch(stopLoader())
    }
}
export const CompleteDetailsScreen = connect(mapStateToProps, mapDispatchToProps)(Screen);



