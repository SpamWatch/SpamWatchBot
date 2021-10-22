import { bot } from '../bot.ts'
import { SpamWatch } from '../config/spamwatch.ts'

bot.command('me', async (ctx) => {
    const userId = ctx.message?.from?.id
    // const userId = 1923448426
    if (userId) {
        await ctx.replyWithChatAction('typing')
        const ban = await SpamWatch.getBan(userId)
        if (ban) {
            const message = ctx.i18n.t('banned_message', {
                reason: ban.reason,
                date: new Date(ban.date as unknown as number * 1000),
            })
            await ctx.reply(message)
        } else {
            await ctx.reply(ctx.i18n.t('not_banned'))
        }
    }
})