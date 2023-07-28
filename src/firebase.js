import { initializeApp, getApps, getApp } from 'firebase/app'
import {
    getMessaging,
    getToken,
    onMessage,
    isSupported,
} from 'firebase/messaging'
import { useStoreFcm } from './hooks/react-query/push-notification/usePushNotification'

const firebaseConfig = {
    apiKey: 'AIzaSyCHtXSskgzeCxfJEz-SvSgdCEhigtppOb4',
    authDomain: 'talbk-19a49.firebaseapp.com',
    projectId: 'talbk-19a49',
    storageBucket: 'talbk-19a49.appspot.com',
    messagingSenderId: '600628571595',
    appId: '1:600628571595:web:fa2b62bccf7a43c2c91a4e',
    measurementId: 'G-PG2LH1W384',
}
const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const messaging = (async () => {
    try {
        const isSupportedBrowser = await isSupported()
        if (isSupportedBrowser) {
            return getMessaging(firebaseApp)
        }

        return null
    } catch (err) {
        return null
    }
})()

export const fetchToken = async (setTokenFound, setFcmToken) => {
    return getToken(await messaging, {
        vapidKey: '0UZ_wlLTv6ZGJVGsHlZvwf9VadhdsvsWo8t1UrL_MXLf1LJpgSMm9cFwcswpAo_Ta5Sd2tjo',
    })
        .then((currentToken) => {
            if (currentToken) {
                setTokenFound(true)
                setFcmToken(currentToken)

                // Track the token -> client mapping, by sending to backend server
                // show on the UI that permission is secured
            } else {
                setTokenFound(false)
                setFcmToken()
                // shows on the UI that permission is required
            }
        })
        .catch((err) => {
            console.error(err)
            // catch error while creating client token
        })
}

export const onMessageListener = async () =>
    new Promise((resolve) =>
        (async () => {
            const messagingResolve = await messaging
            onMessage(messagingResolve, (payload) => {
                resolve(payload)
            })
        })()
    )
