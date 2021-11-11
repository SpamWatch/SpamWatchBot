import dotenv from 'dotenv'
dotenv.config()

import path from 'path'
import fs from 'fs/promises'
import winston from 'winston'
import { bot } from './bot'
import { MODULES_DIR } from './constants'

import './config/i18n'
import './config/logging'

(async () => {
    const modules = await fs.readdir(MODULES_DIR)
    for (const file of modules) {
        if (file.match(/.*\.module\.(ts|js)$/)) {
            await import(path.join(MODULES_DIR, file))
            winston.info(`Loaded module ${file}`)
        }
    }
    
    await bot.start().then(() => {
        winston.info('Bot started')
    })
})();