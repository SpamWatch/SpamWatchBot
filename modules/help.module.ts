import { bot } from '../bot.ts'

bot.command('help', async (ctx) => {
    await ctx.reply(ctx.i18n.t('help_message'))
})