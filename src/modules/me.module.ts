import winston from 'winston'
import { bot } from '../bot'
import { SpamWatch } from '../config/spamwatch'

bot.command('me', async (ctx) => {
    const userId = ctx.message?.from?.id
    if (userId) {
        await ctx.replyWithChatAction('typing')
        const ban = await SpamWatch.getBan(userId)
        if (ban) {
            winston.info(`user info request`, {
                user: ctx.from,
                banned: true,
                banReason: ban.reason,
                banDate: new Date(ban.date as unknown as number * 1000),
            })
            const message = ctx.i18n.t('banned_message', {
                reason: ban.reason,
                date: new Date(ban.date as unknown as number * 1000),
            })
            await ctx.reply(message)
        } else {
            winston.info(`user info request`, {
                user: ctx.from,
                banned: false,
            })
            await ctx.reply(ctx.i18n.t('not_banned'))
        }
    }
})