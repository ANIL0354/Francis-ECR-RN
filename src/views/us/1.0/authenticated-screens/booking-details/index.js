import { connect } from 'react-redux';
import { Screen } from "./screen";
import {
    startLoader,
    stopLoader,
    fetchCompleteDetails
} from '../../../../../redux/actions';

const mapStateToProps = (state) => {
    return ({
        userToken: state.CommonReducer.userToken,
        completeDetails: state.ListsReducer.completeDetails
    });
}
const mapDispatchToProps = (dispatch) => {
    return {
        startLoader: () => dispatch(startLoader()),
        stopLoader: () => dispatch(stopLoader()),
        fetchCompleteDetails: (id, success, failure) => dispatch(fetchCompleteDetails(id, success, failure))
    }
}
export const BookingDetails = connect(mapStateToProps, mapDispatchToProps)(Screen);