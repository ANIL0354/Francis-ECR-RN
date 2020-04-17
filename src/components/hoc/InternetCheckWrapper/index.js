import { connect } from 'react-redux';
import {
    setGpsEnabled,
    setUserLocation,
    setLocationEnabled,
    setNeverAskPermission
} from '../../../redux/actions';
import InternetCheckWrapper from './screen';

const mapStateToProps = (state) => {
    return {
        gpsEnabled: state.CommonReducer.gpsEnabled,
        isNetConnected: state.CommonReducer.isNetConnected,
        locationEnabled: state.CommonReducer.locationEnabled,
        neverAskPermission: state.CommonReducer.neverAskPermission,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUserLocation: (userLocation) => dispatch(setUserLocation(userLocation)),
        setGpsEnabled: (status) => dispatch(setGpsEnabled(status)),
        setLocationEnabled: (status) => dispatch(setLocationEnabled(status)),
        setNeverAskPermission: (status) => { dispatch(setNeverAskPermission(status)); },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InternetCheckWrapper);