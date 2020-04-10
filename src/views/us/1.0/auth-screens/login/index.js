import { connect } from 'react-redux';
import { Screen } from "./screen";
import { registerUser, stopLoader, checkLogin, socialLogin } from '../../../../../redux/actions';

const mapStateToProps = (state) => {
  return ({
  });
}
const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (data, success, failure) => dispatch(registerUser(data, success, failure)),
    checkLogin: (credentials, success, failure) => dispatch(checkLogin(credentials, success, failure)),
    stopLoader: () => dispatch(stopLoader()),
    socialLogin: (data, success, failure) => dispatch(socialLogin(data, success, failure))
  }
}
export const LoginScreen = connect(mapStateToProps, mapDispatchToProps)(Screen);