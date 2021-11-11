import i18next from "i18next";
import { BotContext } from "../constants";

export default async (ctx: BotContext, next: any) => {
    const lang = ctx.message?.from?.language_code;
    ctx.i18n = i18next.cloneInstance({ lng: lang });
    await next();
}
