import PushNotificationIOS from '@react-native-community/push-notification-ios';

export const showNotification = (title,message) => {
    PushNotificationIOS.presentLocalNotification({
        alertTitle : title,
        alertBody: message,
    })
}

export const handelScheduledNotification = (title,message) => {
    const date = new Date()
    date.setSeconds(date.getSeconds() + 5)
    PushNotificationIOS.scheduleLocalNotification({
        alertTitle:title,
        alertBody:message,
        fireDate:date.toISOString(),
    })
}

export const handelCancel = () => {
    PushNotificationIOS.removeAllDeliveredNotifications()
}