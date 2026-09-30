/**
 * SMTP email provider for EmDash, shared by the Node and Cloudflare Worker
 * transports (`smtp-email-node.ts`, `smtp-email-worker.ts`).
 *
 * `astro.config.mjs` registers the plugin when `SMTP_HOST` is set. Activate
 * it under Admin → Extensions and select it under Settings → Email.
 * Settings are read from the environment at send time:
 *
 * - `SMTP_HOST` (required), `SMTP_PORT` (default 587, or 465 when secure)
 * - `SMTP_SECURE` — `true` for implicit TLS; otherwise STARTTLS is used
 * - `SMTP_USERNAME`, `SMTP_PASSWORD` — omit both for unauthenticated relays
 * - `SMTP_FROM` (required), `SMTP_FROM_NAME`, `SMTP_REPLY_TO`
 */
import type { PluginContext, ResolvedPlugin } from 'emdash'
import { definePlugin } from 'emdash'
import type { EmailDeliverEvent } from 'emdash/plugin'

type EmailMessage = EmailDeliverEvent['message']

export const SMTP_EMAIL_PLUGIN_ID = 'smtp-email'

export type SmtpSettings = {
  host: string
  port: number
  secure: boolean
  credentials?: { username: string; password: string }
  from: { email: string; name?: string }
  replyTo?: string
}

export type SmtpSend = (
  settings: SmtpSettings,
  message: EmailMessage
) => Promise<void>

export function readSmtpSettings(
  env: Record<string, string | undefined>
): SmtpSettings {
  const host = env.SMTP_HOST
  const fromEmail = env.SMTP_FROM
  if (!host || !fromEmail) {
    throw new Error('[smtp-email] SMTP_HOST and SMTP_FROM must be set')
  }
  const secure = env.SMTP_SECURE === 'true'
  const port = env.SMTP_PORT ? Number(env.SMTP_PORT) : secure ? 465 : 587
  if (!Number.isInteger(port) || port <= 0) {
    throw new Error(`[smtp-email] invalid SMTP_PORT "${env.SMTP_PORT}"`)
  }
  const username = env.SMTP_USERNAME
  const password = env.SMTP_PASSWORD
  if (!!username !== !!password) {
    throw new Error(
      '[smtp-email] set both SMTP_USERNAME and SMTP_PASSWORD, or neither'
    )
  }
  return {
    host,
    port,
    secure,
    credentials: username && password ? { username, password } : undefined,
    from: { email: fromEmail, name: env.SMTP_FROM_NAME || undefined },
    replyTo: env.SMTP_REPLY_TO || undefined
  }
}

export function createSmtpPlugin(send: SmtpSend): ResolvedPlugin {
  return definePlugin({
    id: SMTP_EMAIL_PLUGIN_ID,
    version: '1.0.0',
    capabilities: ['hooks.email-transport:register'],
    hooks: {
      'email:deliver': {
        exclusive: true,
        handler: async (event: EmailDeliverEvent, ctx: PluginContext) => {
          const settings = readSmtpSettings(process.env)
          const message = {
            ...event.message,
            replyTo: event.message.replyTo ?? settings.replyTo
          }
          await send(settings, message)
          ctx.log.info('email delivered via SMTP', {
            to: message.to,
            subject: message.subject
          })
        }
      }
    }
  })
}
