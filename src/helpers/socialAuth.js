import {
    LoginManager,
    AccessToken,
    GraphRequest,
    GraphRequestManager
} from 'react-native-fbsdk';
import {
    GoogleSignin,
    statusCodes,
} from '@react-native-community/google-signin';

export const facebookAuth = (onSuccess) => {
    LoginManager.logInWithPermissions(["public_profile", 'email']).then(
        function (result) {
            if (result.isCancelled) {
            } else {
                AccessToken.getCurrentAccessToken().then(
                    (data) => {
                        const accessToken = data.accessToken;
                        const responseInfoCallback = (error, result) => {
                            if (error) {
                            } else {
                                onSuccess(result);
                                return;
                            }
                        };
                        const infoRequest = new GraphRequest(
                            '/me',
                            {
                                accessToken,
                                parameters: {
                                    fields: {
                                        string: 'email,name,first_name,middle_name,last_name',
                                    },
                                },
                            },
                            responseInfoCallback,
                        );
                        new GraphRequestManager().addRequest(infoRequest).start();
                        return;
                    }, (error) => {
                    }
                )
            }
        },
        function (error) {
        }
    ).catch((error) => {
        console.log('error', error)
    }).finally((error) => {
        console.log('finally', error)
    })
};

export const googleAuth = async (onSuccess) => {
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        onSuccess(userInfo);
    } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        } else if (error.code === statusCodes.IN_PROGRESS) {
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        } else {
        }
    }
};