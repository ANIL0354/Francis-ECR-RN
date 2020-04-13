import { connect } from 'react-redux';
import { Screen } from "./screen";
import { logout } from '../../../../../redux/actions';

const mapStateToProps = (state) => {
    return ({
        userToken: state.CommonReducer.userToken
    });
}
const mapDispatchToProps = (dispatch) => {
    return {
        logout: (token, success, failure) => dispatch(logout(token, success, failure))
    }
}
export const HomeScreen = connect(mapStateToProps, mapDispatchToProps)(Screen);