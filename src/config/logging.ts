import pkg from '../../package.json'
import winston from 'winston'
import { default as Sentry } from 'winston-transport-sentry-node'

winston.level = 'debug'
winston.add(new winston.transports.Console({}))

const dsn = process.env.SENTRY_DSN
if (dsn) {
    winston.add(new Sentry({
        sentry: {
            dsn,
            tracesSampleRate: 1.0,
            environment: process.env.NODE_ENV,
            release: pkg.version,
        },
        level: 'info',
    }))
}