import { Context, HydrateFlavor, i18next, makeloc, ParseModeContext, SceneContext, SessionFlavor } from './deps.ts'
const { __dirname,  __filename } = makeloc(import.meta)

export const BOT_TOKEN = Deno.env.get('BOT_TOKEN')
export const MODULES_DIR = Deno.env.get('MODULES_DIR') ?? `${__dirname}/modules`
export const REPORT_CHAT_ID = Number(Deno.env.get('REPORT_CHAT_ID')!)
export const ADMIN_CHAT_ID = Number(Deno.env.get('ADMIN_CHAT_ID')!)
export const SUPER_ADMIN_IDS = (Deno.env.get('SUPER_ADMIN_IDS') ?? '').split(/,\s+/).map((id) => Number(id))

export type SessionData = {
  reportType: string | undefined,
  reportContent: string | undefined,
  reportEntity: string | undefined,
}

type InternationalizedContext = { i18n: typeof i18next };
export type BotContext = HydrateFlavor<
  Context & ParseModeContext & InternationalizedContext & SceneContext & SessionFlavor<SessionData>
>;