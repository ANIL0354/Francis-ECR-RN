/* eslint-disable prettier/prettier */
import { connect } from 'react-redux';
import { Screen } from './screen';
import {
    startLoader,
    stopLoader,
    rateAgency,
    fetchCompleteDetails,
} from '../../../../../redux/actions';

const mapStateToProps = (state) => {
    return ({
    });
};
const mapDispatchToProps = (dispatch) => {
    return {
        startLoader: () => dispatch(startLoader()),
        stopLoader: () => dispatch(stopLoader()),
        fetchCompleteDetails: (id, success, failure) => dispatch(fetchCompleteDetails(id, success, failure)),
        rateAgency: (listingId, data, success, failure) => dispatch(rateAgency(listingId, data, success, failure)),
    };
};
export const RatingAgencyScreen = connect(mapStateToProps, mapDispatchToProps)(Screen);
