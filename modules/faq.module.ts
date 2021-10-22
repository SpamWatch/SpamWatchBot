import { bot } from '../bot.ts'
import { i18next } from '../deps.ts'

const questionKeys = Object.keys(i18next.store!.data['en']['faq'])
    .filter((k) => !k.match(/^(answer|file)/))

bot.command('faq', async (ctx) => {
    const faq = questionKeys.reduce((acc, key) => {
        const translation = ctx.i18n.t(`faq:${key}`)
        acc += `- *${translation}*\n/faq\\_${key.replaceAll('_', '\\_')}\n\n`
        return acc
    }, '')

    await ctx.reply(ctx.i18n.t('faq_message', { faq }))
})

const answerKeys = Object.keys(i18next.store!.data['en']['faq'])
    .filter((k) => k.startsWith('answer'))
const commands = answerKeys.map((k) => k.replace('answer_', 'faq_'))

bot.command(commands, async (ctx) => {
    const key = ctx.msg.text.split(' ')[0].replace('/faq_', '')
    if (ctx.i18n.translator?.exists(`faq:answer_${key}`)) {
        const title = ctx.i18n.t(`faq:${key}`)
        const answer = ctx.i18n.t(`faq:answer_${key}`)
        const file = ctx.i18n.translator?.exists(`faq:file_${key}`) ? ctx.i18n.t(`faq:file_${key}`).trim() : undefined
        const message = `*${title}*\n\n${answer}`
        
        if (file) {
            await ctx.replyWithPhoto(file, { caption: message })
        } else {
            await ctx.reply(message)
        }
    }
})