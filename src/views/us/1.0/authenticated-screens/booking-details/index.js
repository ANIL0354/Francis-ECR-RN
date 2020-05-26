/* eslint-disable prettier/prettier */
import { connect } from 'react-redux';
import { Screen } from './screen';
import {
    startLoader,
    stopLoader,
    getFaqList,
    fetchCompleteDetails
} from '../../../../../redux/actions';

const mapStateToProps = (state) => {
    return ({
        userToken: state.CommonReducer.userToken,
        faqList: state.CommonReducer.faqList,
        completeDetails: state.ListsReducer.completeDetails
    });
}
const mapDispatchToProps = (dispatch) => {
    return {
        startLoader: () => dispatch(startLoader()),
        stopLoader: () => dispatch(stopLoader()),
        fetchCompleteDetails: (id, success, failure) => dispatch(fetchCompleteDetails(id, success, failure)),
        getFaqList: (success, failure) => dispatch(getFaqList(success, failure))
    }
}
export const BookingDetails = connect(mapStateToProps, mapDispatchToProps)(Screen);