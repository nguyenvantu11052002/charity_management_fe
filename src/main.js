import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import './assets/main.css'
import UserLayout from './layout/UserLayout.vue'
import { createPinia } from 'pinia'
import { useAuthStore } from './store/authStore'
import AdminLayout from './layout/AdminLayout.vue'
import HomeIcon from './components/icons/HomeIcon.vue'
import UsersIcon from './components/icons/UsersIcon.vue'
import CampaignsIcon from './components/icons/CampaignsIcon.vue'
import DonationsIcon from './components/icons/DonationsIcon.vue'
import FilterIcon from './components/icons/FilterIcon.vue'
import RoleIcon from './components/icons/RoleIcon.vue'
import CategoriesIcon from './components/icons/CategoriesIcon.vue'
import NotificationsIcon from './components/icons/NotificationsIcon.vue'
import NotificationTemplatesIcon from './components/icons/NotificationTemplatesIcon.vue'

const pinia = createPinia()
const app = createApp(App)

app
  .use(pinia)
  .use(router)
  .component('user-layout', UserLayout)
  .component('admin-layout', AdminLayout)
  .component('home-icon', HomeIcon)
  .component('users-icon', UsersIcon)
  .component('campaigns-icon', CampaignsIcon)
  .component('donations-icon', DonationsIcon)
  .component('filters-icon', FilterIcon)
  .component('role-icon', RoleIcon)
  .component('categories-icon', CategoriesIcon)
  .component('notificationTemplates-icon', NotificationTemplatesIcon)
  .component('notifications-icon', NotificationsIcon)
app.mount('#app')

router.beforeEach((to, from) => {
  const authStore = useAuthStore()

  if (to.name === 'user-create-campaign-route') {
    if (!authStore.currentUser) {
      router.push({ to: { name: 'login-route' } })
      return '/login'
    }
  }
  //tu choi login page khi da dang nhap
  if (
    (to.name === 'login-route' ||
      to.name === 'register-route' ||
      to.name === 'forgot-password-route' ||
      to.name === 'reset-password-route') &&
    authStore.currentUser
  ) {
    return from
  } else {
    return true
  }
  // return true
})
