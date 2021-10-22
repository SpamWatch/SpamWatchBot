import { bot } from '../bot.ts'
import { SpamWatch } from '../config/spamwatch.ts'
import { ADMIN_CHAT_ID } from "../constants.ts";
import { dedent } from "../deps.ts";

bot.command('unban', async (ctx) => {
    if (!ADMIN_CHAT_ID) {
        console.warn('No ADMIN_CHAT_ID set. Unban requests are disabled.')
        return
    }
    
    const text = ctx.match.trim()
    const user = ctx.msg.from
    if (user) {
        if (text.length > 0) {
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
