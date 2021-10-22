import { i18next, FSBackend, makeloc, path, YAML } from '../deps.ts'
const { __dirname,  __filename } = makeloc(import.meta)

i18next
    .use(FSBackend)
    .init({
        initImmediate: false,
        fallbackLng: 'en',
        lng: 'en',
        ns: ['default', 'faq'],
        defaultNS: 'default',
        parse: (data: string) => {
            console.log(data)
            return YAML.parse(data)
        },
        backend: {
            loadPath: path.join(__dirname, './locales/{{lng}}/{{ns}}.yaml')
        },
    })