import winston from 'winston'
import { botPrivate } from '../bot'
import { SpamWatch } from '../config/spamwatch'
import { BotContext } from "../constants";

export const tokenRequest = async (ctx: BotContext) => {
    const text = ctx.match
    const userId = ctx.msg?.from?.id
    if (!userId) return

    if (text && text.length > 0) {
        if (text === 'revoke') {
            winston.info(`token revoke request`, { user: ctx.from })
            const tokens = await SpamWatch.getTokenUser(userId)
            if (tokens && tokens.length > 0) {
                const token = tokens[tokens.length - 1]
                await SpamWatch.deleteToken(token.id)
                await ctx.reply(ctx.i18n.t('token_revoked'))
            } else {
                await ctx.reply(ctx.i18n.t('no_token_to_revoke'))
            }
        } else {
            await ctx.reply(ctx.i18n.t('unknown_command', { command: text }))
        }
    } else {
        const tokens = await SpamWatch.getTokenUser(userId)
        winston.info(`new token request`, { user: ctx.from })
        if (tokens && tokens.length > 0) {
            const token = tokens[tokens.length - 1]
            await ctx.reply(ctx.i18n.t('user_token', { token }))
        } else {
            const token = await SpamWatch.createToken(userId, 'User')
            await ctx.reply(ctx.i18n.t('user_token', { token }))
        }
    }
}

botPrivate.command('token', async (ctx) => {
    await tokenRequest(ctx)
})

