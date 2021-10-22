import 'https://deno.land/x/dotenv@v3.0.0/load.ts'

import { path } from './deps.ts'
import { bot } from './bot.ts'
import { MODULES_DIR } from './constants.ts'


import './config/i18n.ts'

for await (const entry of Deno.readDir(MODULES_DIR)) {
    if (entry.isFile && entry.name.endsWith('.module.ts')) {
        await import(path.join(MODULES_DIR, entry.name))
    }
}

bot.start()