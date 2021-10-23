import { bot } from '../bot.ts'
import { tokenRequest } from './token.module.ts'

bot.command('start', async (ctx) => {
    const text = ctx.match.toLowerCase().trim()
    switch (text) {
        case 'token':
            ctx.match = ''
            await tokenRequest(ctx)
            break
        default:
            await ctx.reply(ctx.i18n.t('start_message'))
    }
})