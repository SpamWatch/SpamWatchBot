export * as path from 'https://deno.land/std@0.111.0/path/mod.ts'

export { default as YAML } from 'https://cdn.skypack.dev/yaml'

export { default as makeloc } from 'https://deno.land/x/dirname@1.1.2/mod.ts'

export { default as i18next } from 'https://deno.land/x/i18next@v21.3.1/index.js'
export { default as FSBackend } from 'https://deno.land/x/i18next_fs_backend@v1.1.1/index.js'

export { Bot, Context, GrammyError, HttpError, BotError, Keyboard, InlineKeyboard, session } from 'https://deno.land/x/grammy@v1.3.3/mod.ts'
export type { ReplyKeyboardRemove } from "https://deno.land/x/grammy@v1.3.3/platform.ts";
export type { SessionFlavor } from 'https://deno.land/x/grammy@v1.3.3/mod.ts'

export { hydrate } from 'https://deno.land/x/grammy_hydrate@v1.0.3/mod.ts'
export type { HydrateFlavor } from 'https://deno.land/x/grammy_hydrate@v1.0.3/mod.ts'

export { hydrateReply, parseMode } from 'https://deno.land/x/grammy_parse_mode@0.1.3/mod.ts'
export type { ParseModeContext } from 'https://deno.land/x/grammy_parse_mode@0.1.3/mod.ts'

export { createScene, hydrateScene } from 'https://raw.githubusercontent.com/KnightNiwrem/basic-scene/4b40f78f4ab467dcc862e459f12a032cc876b049/src/mod.ts'
export type { SceneContext } from 'https://raw.githubusercontent.com/KnightNiwrem/basic-scene/4b40f78f4ab467dcc862e459f12a032cc876b049/src/mod.ts'

export * as redis from 'https://deno.land/x/redis@v0.25.0/mod.ts'

// export * as spamwatch from 'https://raw.githubusercontent.com/watzon/spamwatch-js-fetch/main/src/index.ts'
export * as spamwatch from '../../clones/spamwatch-js-fetch/src/index.ts'

export { default as dedent } from 'https://raw.githubusercontent.com/tamino-martinius/node-ts-dedent/43e5c24511e0ea04870889c9f4d8590fad0da28d/src/index.ts'