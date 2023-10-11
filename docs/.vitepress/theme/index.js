import Theme from 'vitepress/theme'
import Layout from './Layout.vue'
import './style.css'
export default {
  ...Theme,
  enhanceApp(ctx) {
    Theme.enhanceApp(ctx)
  },
  Layout
}

