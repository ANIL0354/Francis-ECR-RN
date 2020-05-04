import { connect } from 'react-redux';
import { Screen } from "./screen";

const mapStateToProps = (state) => {
    return ({
        userToken: state.CommonReducer.userToken
    });
}
const mapDispatchToProps = (dispatch) => {
    return {
    }
}
export const SplashScreen = connect(mapStateToProps, mapDispatchToProps)(Screen);



