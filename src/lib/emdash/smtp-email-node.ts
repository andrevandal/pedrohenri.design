/** SMTP transport for the Node adapter. */
import nodemailer from 'nodemailer'
import { createSmtpPlugin } from './smtp'

export function createPlugin() {
  return createSmtpPlugin(async (settings, message) => {
    const transport = nodemailer.createTransport({
      host: settings.host,
      port: settings.port,
      secure: settings.secure,
      auth: settings.credentials
        ? {
            user: settings.credentials.username,
            pass: settings.credentials.password
          }
        : undefined
    })
    await transport.sendMail({
      from: { name: settings.from.name ?? '', address: settings.from.email },
      to: message.to,
      subject: message.subject,
      text: message.text,
      ...(message.html ? { html: message.html } : {}),
      ...(message.cc?.length ? { cc: message.cc } : {}),
      ...(message.replyTo ? { replyTo: message.replyTo } : {})
    })
  })
}
