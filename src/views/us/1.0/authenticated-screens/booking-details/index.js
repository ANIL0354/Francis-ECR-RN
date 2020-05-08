import { connect } from 'react-redux';
import { Screen } from "./screen";
import {
    startLoader,
    stopLoader,
} from '../../../../../redux/actions';

const mapStateToProps = (state) => {
    return ({
    });
}
const mapDispatchToProps = (dispatch) => {
    return {
        startLoader: () => dispatch(startLoader()),
        stopLoader: () => dispatch(stopLoader()),
    }
}
export const BookingDetails = connect(mapStateToProps, mapDispatchToProps)(Screen);