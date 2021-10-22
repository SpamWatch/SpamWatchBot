import { bot } from '../bot.ts'

bot.command('start', async (ctx) => {
    await ctx.reply(ctx.i18n.t('start_message'))
})