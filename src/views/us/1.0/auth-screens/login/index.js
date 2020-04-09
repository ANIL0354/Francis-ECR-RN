import { connect } from 'react-redux';
import { Screen } from "./screen";
import { registerUser } from '../../../../../redux/actions';

const mapStateToProps = (state) => {
  return ({
  });
}
const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (data, success, failure) => dispatch(registerUser(data, success, failure))
  }
}
export const LoginScreen = connect(mapStateToProps, mapDispatchToProps)(Screen);



