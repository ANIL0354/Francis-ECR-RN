import { PermissionsAndroid } from 'react-native';

export const AskPermission = (permission) => {
    return new Promise((resolve, reject) => {
        PermissionsAndroid.request(permission)
            .then(hasPermission => {
                if (hasPermission) {
                    resolve(hasPermission);
                } else {
                    reject();
                }
            })
            .catch(reject);
    });
}


export const CheckPermission = (permision) => {
    return new Promise((resolve, reject) => {
        PermissionsAndroid.check(permision)
            .then(hasPermission => {
                if (hasPermission) {
                    resolve("granted");
                } else {
                    AskPermission(permision)
                        .then(resolve)
                        .catch(reject);
                }
            })
            .catch(reject);
    });
}

export async function requestGPSPermission() {
    try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
        } else {
            console.log('GPS permission denied');
        }
    } catch (err) {
        console.warn(err);
    }
};