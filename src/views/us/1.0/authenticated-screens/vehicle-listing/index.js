import { connect } from 'react-redux';
import { Screen } from "./screen";
import { logout, setGpsEnabled, setLocationEnabled, setNeverAskPermission, updateInternetStatus } from '../../../../../redux/actions';

const mapStateToProps = (state) => {
    return ({
        userToken: state.CommonReducer.userToken,
        gpsEnabled: state.CommonReducer.gpsEnabled,
        locationEnabled: state.CommonReducer.locationEnabled,
        neverAskPermission: state.CommonReducer.neverAskPermission,
        isNetConnected: state.CommonReducer.isNetConnected,
    });
}
const mapDispatchToProps = (dispatch) => {
    return {
        logout: (token, success, failure) => dispatch(logout(token, success, failure)),
        setGpsEnabled: status => dispatch(setGpsEnabled(status)),
        updateInternetStatus: status => dispatch(updateInternetStatus(status)),
        setLocationEnabled: status => dispatch(setLocationEnabled(status)),
        setNeverAskPermission: status => dispatch(setNeverAskPermission(status)),
    }
}
export const VehicleListing = connect(mapStateToProps, mapDispatchToProps)(Screen);