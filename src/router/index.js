import Head from '../components/head/head.jsx'
import Markdown from '../components/markdown/markdown.jsx'

const routes = [
    {
        path: '/',
        exact: true,
        component: Head,
    },
    {
        path: '/Markdown',
        exact:false,
        component: Markdown,
    }
]
export default routes