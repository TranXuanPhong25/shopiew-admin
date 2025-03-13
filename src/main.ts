import './assets/main.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'
import {
  // create naive ui
  create,
  // component
  NButton, NSwitch, NLayout, NLayoutSider, NSpace,NMenu,NInput,NDropdown,NFlex,NAvatar
} from 'naive-ui'
import App from './App.vue'
import router from './router'

const naive = create({
  components: [NButton, NLayout, NLayoutSider, NSwitch, NSpace,NMenu,NInput,NDropdown,NFlex,NAvatar]
})

const app = createApp(App)

app.use(createPinia())
app.use(naive)
app.use(router)

app.mount('#app')
