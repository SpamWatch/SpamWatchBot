import winston from 'winston'
import { ReplyKeyboardRemove } from '@grammyjs/types'
import { createScene } from 'basic-scene'
import { Keyboard } from 'grammy'
import { bot, botPrivate } from '../bot'
import { BotContext, REPORT_CHAT_ID } from '../constants'

const RemoveKeyboard: ReplyKeyboardRemove = { remove_keyboard: true }

enum Scenes {
    SetReportType = 'report type',
    ReportEntity = 'report entity',
    ReportContent = 'report content',
}

const reportTypeKeyboard = new Keyboard()
    .text('Spam').row()
    .text('Scam').row()
    .text('Mass Adding').row()
    .text('Child Abuse')

const clearSession = (ctx: BotContext) => {
    ctx.session.reportType = undefined
    ctx.session.reportEntity = undefined
    ctx.session.reportEntity = undefined
}

const stopReporting = async (ctx: BotContext, early = false) => {
    if (early) {
        winston.info(`report terminated early`, { user: ctx.from })
        await ctx.reply(ctx.i18n.t('reporting_stopped'), { reply_markup: RemoveKeyboard })
    }
    clearSession(ctx)
    await ctx.scene.exit()
}

const { sceneMiddleware: reportTypeMiddleware, sceneBuilder: reportTypeBuilder } =
    createScene<BotContext>(Scenes.SetReportType, async (ctx) => await ctx.reply(ctx.i18n.t('set_report_type'), { reply_markup: reportTypeKeyboard }))
reportTypeBuilder.command('stop', (ctx) => stopReporting(ctx, true))
reportTypeBuilder.on(':text', async (ctx) => {
    const text = ctx.msg.text.trim().toLowerCase()
    switch (text) {
        case 'spam':
        case 'scam':
        case 'child abuse':
            await ctx.reply(ctx.i18n.t('forward_spam_messages', { type: text }))
            await stopReporting(ctx, true)
            break
        case 'mass adding':
            ctx.session.reportType = text
            ctx.scene.enter(Scenes.ReportEntity)
            break
        default:
            await ctx.reply(ctx.i18n.t('invalid_report_type'))
    }
})

const { sceneMiddleware: reportEntityMiddleware, sceneBuilder: reportEntityBuilder } =
    createScene<BotContext>(Scenes.ReportEntity, async (ctx) => await ctx.reply(ctx.i18n.t('report_entity'), { reply_markup: RemoveKeyboard }))
reportEntityBuilder.command('stop', (ctx) => stopReporting(ctx, true))
reportEntityBuilder.on(':text', async (ctx) => {
    const text = ctx.msg.text.trim()
    if (text.startsWith('@') || text.match(/^https?:\/\/t.me/)) {
        if (text.match(/^https?:\/\/t\.me\/c\//)) {
            await ctx.reply(ctx.i18n.t('possible_private_chat'))
        } else {
            ctx.session.reportEntity = text
            await ctx.scene.enter(Scenes.ReportContent)
        }
    } else {
        await ctx.reply(ctx.i18n.t('invaid_report_entity'))
    }
})

const { sceneMiddleware: reportContentMiddleware, sceneBuilder: reportContentBuilder } =
    createScene<BotContext>(Scenes.ReportContent, async (ctx) => await ctx.reply(ctx.i18n.t('report_content')))
reportContentBuilder.command('stop', (ctx) => stopReporting(ctx, true))
reportContentBuilder.on(':text', async (ctx) => {
    const text = ctx.msg.text.trim()
    ctx.session.reportContent = text
    winston.info(`new report`, { user: ctx.from, report: ctx.session })
    const message = `*New Report*\nType: ${ctx.session.reportType}\nEntity: ${ctx.session.reportEntity}\nDescription: ${ctx.session.reportContent}`
    await bot.api.sendMessage(REPORT_CHAT_ID, message)
    await ctx.reply(ctx.i18n.t('thanks_for_report'))
    await stopReporting(ctx, false)
})

botPrivate.use(reportTypeMiddleware)
botPrivate.use(reportEntityMiddleware)
botPrivate.use(reportContentMiddleware)

botPrivate.command('report', async (ctx) => {
    winston.info(`start report`, { user: ctx.from })
    await ctx.scene.enter(Scenes.SetReportType)
})

botPrivate.on('msg:forward_date', async (ctx) => {
    if (ctx.chat.type === 'private') {
        winston.info(`forwarded report`, { user: ctx.from, forwardFrom: ctx.msg.forward_from })
        if (ctx.msg.forward_from) {
            await ctx.msg.forward(REPORT_CHAT_ID)
            await ctx.reply(ctx.i18n.t('thanks_for_report'))
        } else {
            await ctx.reply(ctx.i18n.t('cant_forward'))
        }
    }
})
