// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

import App from '../components/App'
import Index from '../components/Index'
import About from '../components/About'

export default {
  path: '/',
  component: App,
  childRoutes: [
    { path: 'about', component: About }
  ],
  /*getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [ require('./AboutRoute') ])
    })
  },*/
  indexRoute: {
    component: Index
  }
}

