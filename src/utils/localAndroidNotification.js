import PushNotification from "react-native-push-notification";

export const showNotificationAndroid = (title,message) => {
    PushNotification.localNotification({
        alertTitle : title,
        alertBody: message,
    })
}

export const handelScheduledNotification = (title,message) => {
    PushNotification.localNotificationSchedule({
        alertTitle:title,
        alertBody:message,
        date:new Date(Date.now() + 5 * 1000),
    })
}

export const handelCancel = () => {
    PushNotification.cancelAllLocalNotifications()
}