import winston from 'winston'
import { bot } from '../bot'

bot.command('help', async (ctx) => {
    winston.info(`help request`, {
        user: ctx.from,
    })
    await ctx.reply(ctx.i18n.t('help_message'))
})