import winston from 'winston'
import { botPrivate } from '../bot'
import { tokenRequest } from './token.module'

botPrivate.command('start', async (ctx) => {
    const text = ctx.match.toLowerCase().trim()
    winston.info(`bot started`, { user: ctx.from })
    switch (text) {
        case 'token':
            ctx.match = ''
            await tokenRequest(ctx)
            break
        default:
            await ctx.reply(ctx.i18n.t('start_message'))
    }
})