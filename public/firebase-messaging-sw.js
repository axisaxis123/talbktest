importScripts(
    'https://www.gstatic.com/firebasejs/9.13.0/firebase-app-compat.js'
)
importScripts(
    'https://www.gstatic.com/firebasejs/9.13.0/firebase-messaging-compat.js'
)
firebase?.initializeApp({
    apiKey: 'AIzaSyCHtXSskgzeCxfJEz-SvSgdCEhigtppOb4',
    authDomain: 'talbk-19a49.firebaseapp.com',
    projectId: 'talbk-19a49',
    storageBucket: 'talbk-19a49.appspot.com',
    messagingSenderId: '600628571595',
    appId: '1:600628571595:web:fa2b62bccf7a43c2c91a4e',
    measurementId: 'G-PG2LH1W384',
})

// Retrieve firebase messaging
const messaging = firebase?.messaging()

messaging.onBackgroundMessage(function (payload) {
    const notificationTitle = payload.notification.title
    const notificationOptions = {
        body: payload.notification.body,
    }

    self.registration.showNotification(notificationTitle, notificationOptions)
})
