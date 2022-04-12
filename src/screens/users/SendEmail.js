import Mailer from 'react-native-mail';

export async function sendEmail(to, subject, body) {
  try {
    Mailer.mail(
      {
        subject: subject,
        recipients: [to],
        ccRecipients: ['suneel@chopdawg.com'],
        body: body,
      },
      (error, event) => {
        console.log(event);
        console.log(error);
        // Alert.alert(
        //   error,
        //   event,
        //   [
        //     {text: 'Email Sent', onPress: () => console.log('OK: Email Error Response')},
        //     {text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response')}
        //   ],
        //   { cancelable: true }
        // )
      },
    );
  } catch {
    (err) => alert(err);
  }
}
