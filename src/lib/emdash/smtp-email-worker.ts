/** SMTP transport for Cloudflare Workers (TCP via `cloudflare:sockets`). */
import { WorkerMailer } from 'worker-mailer'
import { createSmtpPlugin } from './smtp'

export function createPlugin() {
  return createSmtpPlugin(async (settings, message) => {
    await WorkerMailer.send(
      {
        host: settings.host,
        port: settings.port,
        secure: settings.secure,
        startTls: !settings.secure,
        credentials: settings.credentials
      },
      {
        from: settings.from,
        to: message.to,
        subject: message.subject,
        text: message.text,
        ...(message.html ? { html: message.html } : {}),
        ...(message.cc?.length ? { cc: message.cc } : {}),
        ...(message.replyTo ? { reply: message.replyTo } : {})
      }
    )
  })
}
