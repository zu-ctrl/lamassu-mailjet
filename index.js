const Mailjet = require('node-mailjet')

const NAME = 'Mailjet'
const SUPPORTED_MODULES = ['email']

let conf

function config (_conf) {
  conf = _conf
}

function sendMessage (rec) {
  const mailjet = Mailjet.connect(conf.apiKey, conf.apiSecret)
  const sendEmail = mailjet.post('send')

  const emailData = {
    FromEmail: conf.fromEmail,
    FromName: 'Lamassu Server',
    Subject: rec.email.subject,
    'Text-part': rec.email.body,
    Recipients: [{'Email': conf.toEmail}]
  }

  return sendEmail.request(emailData)
}

module.exports = {
  NAME,
  SUPPORTED_MODULES,
  config,
  sendMessage
}
