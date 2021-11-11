import winston from 'winston'
import { Loggly } from 'winston-loggly-bulk'

winston.level = 'debug'
winston.add(new winston.transports.Console({}))

const logglyToken = process.env.LOGGLY_TOKEN
const logglySubdomain = process.env.LOGGLY_SUBDOMAIN
const logglyTags = process.env.LOGGLY_TAGS?.split(/,\s*/)
if (logglyToken && logglySubdomain) {
    winston.add(new Loggly({
        token: logglyToken,
        subdomain: logglySubdomain,
        tags: logglyTags || ['SpamWatchBot'],
        json: true,
    }))
}