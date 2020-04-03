import { connect } from 'react-redux';
import { Screen } from "./screen";
const { defaultConfig: { PLATFORM } } = require(`../../../../../config/default`);
const { } = require(`../../../../../redux/${PLATFORM}/actions`);

const mapStateToProps = (state) => {
    return ({
    });
}
const mapDispatchToProps = (dispatch) => {
    return {
    }
}
export const ForgotScreen = connect(mapStateToProps, mapDispatchToProps)(Screen);



