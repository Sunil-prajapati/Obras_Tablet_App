const Mailgun = require('mailgun.js');
const formData = require('form-data');

const API_KEY = '3b90a22c3f4decd2548523bb86b9cd90-adf6de59-3c0ba5e8';
const DOMAIN = 'sandboxc18a9f3ae5474dff80fdcb2bb0b778dc.mailgun.org';
export default sendMailgunEmail = async (to, subject, body) => {
  const mailgun = new Mailgun(formData);
  const client = mailgun.client({username: 'Sunnel', key: API_KEY});
  const messageData = {
    from: 'Excited User <suneel@chopdawg.com>',
    to: [to],
    subject: subject,
    text: body,
  };
  client.messages
    .create(DOMAIN, messageData)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
};
