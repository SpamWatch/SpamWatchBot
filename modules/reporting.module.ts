import { bot } from '../bot.ts'
import { BotContext, REPORT_CHAT_ID } from '../constants.ts'
import { createScene, Keyboard, ReplyKeyboardRemove } from '../deps.ts'

const RemoveKeyboard: ReplyKeyboardRemove = { remove_keyboard: true }

enum Scenes {
    SetReportType = 'report type',
    ReportEntity = 'report entity',
    ReportContent = 'report content',
}

const reportTypeKeyboard = new Keyboard()
    .text('Spam').row()
    .text('Scam').row()
    .text('Child Abuse')

const clearSession = (ctx: BotContext) => {
    ctx.session.reportType = undefined
    ctx.session.reportEntity = undefined
    ctx.session.reportEntity = undefined
}

const stopReporting = async (ctx: BotContext) => {
    await ctx.reply(ctx.i18n.t('reporting_stopped'), { reply_markup: RemoveKeyboard })
    clearSession(ctx)
    await ctx.scene.exit()
}

const { sceneMiddleware: reportTypeMiddleware, sceneBuilder: reportTypeBuilder } =
    createScene<BotContext>(Scenes.SetReportType, async (ctx) => await ctx.reply(ctx.i18n.t('set_report_type'), { reply_markup: reportTypeKeyboard }))
reportTypeBuilder.command('stop', stopReporting)
reportTypeBuilder.on(':text', async (ctx) => {
    const text = ctx.msg.text.trim().toLowerCase()
    switch (text) {
        case 'spam':
        case 'scam':
        case 'child_abuse':
            ctx.session.reportType = text
            ctx.scene.enter(Scenes.ReportEntity)
            break
        default:
            await ctx.reply(ctx.i18n.t('invalid_report_type'))
    }
})

const { sceneMiddleware: reportEntityMiddleware, sceneBuilder: reportEntityBuilder } =
    createScene<BotContext>(Scenes.ReportEntity, async (ctx) => await ctx.reply(ctx.i18n.t('report_entity'), { reply_markup: RemoveKeyboard }))
reportEntityBuilder.command('stop', stopReporting)
reportEntityBuilder.on(':text', async (ctx) => {
    const text = ctx.msg.text.trim().toLowerCase()
    if (text.startsWith('@') || text.match(/https?:\/\/t.me/)) {
        ctx.session.reportEntity = text
        await ctx.scene.enter(Scenes.ReportContent)
    } else {
        await ctx.reply(ctx.i18n.t('invaid_report_entity'))
    }
})

const { sceneMiddleware: reportContentMiddleware, sceneBuilder: reportContentBuilder } =
    createScene<BotContext>(Scenes.ReportContent, async (ctx) => await ctx.reply(ctx.i18n.t('report_content')))
reportContentBuilder.command('stop', stopReporting)
reportContentBuilder.on(':text', async (ctx) => {
    const text = ctx.msg.text.trim()
    ctx.session.reportContent = text
    const message = `*New Report*\nType: ${ctx.session.reportType}\nEntity: ${ctx.session.reportEntity}\nDescription: ${ctx.session.reportContent}`
    await bot.api.sendMessage(REPORT_CHAT_ID, message)
    await ctx.reply(ctx.i18n.t('thanks_for_report'))
    clearSession(ctx)
})

bot.use(reportTypeMiddleware)
bot.use(reportEntityMiddleware)
bot.use(reportContentMiddleware)

bot.command('report', async (ctx) => {
    await ctx.scene.enter(Scenes.SetReportType)
})

bot.on('msg:forward_date', async (ctx) => {
    if (ctx.msg.forward_from) {
        await ctx.msg.forward(REPORT_CHAT_ID)
    } else {
        await ctx.reply(ctx.i18n.t('cant_forward'))
    }
})
