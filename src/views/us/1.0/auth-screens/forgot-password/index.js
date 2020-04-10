import { connect } from 'react-redux';
import { Screen } from "./screen";
import { sendRecoveryEmail, stopLoader } from '../../../../../redux/actions';

const mapStateToProps = (state) => {
    return ({
    });
}
const mapDispatchToProps = (dispatch) => {
    return {
        stopLoader: () => dispatch(stopLoader()),
        sendRecoveryEmail: (data, success, failure) => dispatch(sendRecoveryEmail(data, success, failure))
    }
}
export const ForgotScreen = connect(mapStateToProps, mapDispatchToProps)(Screen);



