import winston from 'winston'
import { default as Sentry } from 'winston-transport-sentry-node'

winston.level = 'debug'
winston.add(new winston.transports.Console({}))

const dsn = process.env.SENTRY_DSN
if (dsn) {
    const sentryTransport = new Sentry({
        sentry: {
            dsn,
            tracesSampleRate: 1.0,
            environment: process.env.NODE_ENV,
        },
        level: 'info',
    })
    winston.add(sentryTransport)
}