import path from "path"
import i18next from "i18next"
import FSBackend from 'i18next-fs-backend'

i18next
    .use(FSBackend)
    .init({
        initImmediate: false,
        fallbackLng: 'en',
        lng: 'en',
        ns: ['default', 'faq'],
        defaultNS: 'default',
        // parse: (data: string) => {
        //     console.log(data)
        //     return YAML.parse(data)
        // },
        backend: {
            loadPath: path.join(__dirname, './locales/{{lng}}/{{ns}}.yaml')
        },
    })