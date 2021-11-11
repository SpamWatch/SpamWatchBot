import i18next from "i18next"
import { Context, SessionFlavor } from 'grammy'
import { ParseModeContext } from '@grammyjs/parse-mode'
import { HydrateFlavor } from '@grammyjs/hydrate'
import { SceneContext } from 'basic-scene'

export const BOT_TOKEN = process.env.BOT_TOKEN
export const MODULES_DIR = process.env.MODULES_DIR ?? `${__dirname}/modules`
export const REPORT_CHAT_ID = Number(process.env.REPORT_CHAT_ID!)
export const ADMIN_CHAT_ID = Number(process.env.ADMIN_CHAT_ID!)
export const SUPER_ADMIN_IDS = (process.env.SUPER_ADMIN_IDS ?? '').split(/,\s+/).map((id) => Number(id))

export type SessionData = {
  reportType: string | undefined,
  reportContent: string | undefined,
  reportEntity: string | undefined,
}

type InternationalizedContext = { i18n: typeof i18next };
export type BotContext = HydrateFlavor<
  Context & ParseModeContext & InternationalizedContext & SceneContext & SessionFlavor<SessionData>
>;