import winston from 'winston'
import { bot, botPrivate } from '../bot'
import { SpamWatch } from '../config/spamwatch'
import { ADMIN_CHAT_ID, SUPER_ADMIN_IDS } from "../constants";
import dedent from 'dedent'

botPrivate.command('unban', async (ctx) => {
    const text = ctx.match.trim()
    const user = ctx.msg.from
    if (user) {
        if (text.length > 0) {
            winston.info(`new unban request`, { user: ctx.from })
            const ban = await SpamWatch.getBan(user.id)
            if (ban) {
                const reason = ban.reason
                if (reason.match(/cp|ca|spamadding|Spamadd\[0x0 \(owner\)\]/i)) {
                    await ctx.reply(ctx.i18n.t('unban_request_denied', { reason }))
                } else {
                    await bot.api.sendMessage(
                        ADMIN_CHAT_ID,
                        dedent`
                            *Unban Request*
                            User: [${user.first_name}](tg://user?id=${user.id}) (\`${user.id}\`)
                            Ban reason: ${ban.reason}
                            Request: ${text}

                            Reply to this message to respond.
                        `.trim()
                    )
                    await ctx.reply(ctx.i18n.t('unban_request_submitted'))
                }
            } else {
                await ctx.reply(ctx.i18n.t('not_banned'))
            }
        } else {
            await ctx.reply(ctx.i18n.t('unban_request_requires_content'))
        }
    }
})

botPrivate.command(['deny', 'approve'], async (ctx) => {
    if (ctx.chat.id === ADMIN_CHAT_ID) {
        if (ctx.msg.from?.id === ctx.me.id) {
            const forwardFrom = ctx.msg.forward_from_chat
            if (forwardFrom) {
                const user = ctx.from
                if (user &&  SUPER_ADMIN_IDS.includes(user.id)) {
                    // Only Simon gets passed this point
                    const parts = ctx.msg.text.split(/\s+/, 2)
                    const command = parts[0].slice(1)
                    const text = parts[1].trim()
                    await bot.api.sendMessage(forwardFrom.id, ctx.i18n.t('unban_decision', { decision: command, reason: text }))
                }
            }
        }
    }
})