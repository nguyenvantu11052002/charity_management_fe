import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/user/HomeView.vue'
import AboutView from '@/views/user/AboutView.vue'
import CampaignsView from '@/views/user/CampaignsView.vue'
import LoginView from '@/views/user/LoginView.vue'
import AdminHomeView from '@/views/admin/AdminHomeView.vue'
import RegisterView from '@/views/user/RegisterView.vue'
import ForgotPasswordView from '@/views/user/ForgotPasswordView.vue'
import ResetPasswordView from '@/views/user/ResetPasswordView.vue'
import AdminDonationsView from '@/views/admin/AdminDonationsView.vue'
import AdminUserDetailView from '@/views/admin/AdminUserDetailView.vue'
import AdminUserListView from '@/views/admin/AdminUserListView.vue'
import AdminCreateUserView from '@/views/admin/AdminCreateUserView.vue'
import AdminRolesListView from '@/views/admin/AdminRolesListView.vue'
import AdminRoleDetailView from '@/views/admin/AdminRoleDetailView.vue'
import AdminCreateRoleView from '@/views/admin/AdminCreateRoleView.vue'
import AdminCampaignsListView from '@/views/admin/AdminCampaignsListView.vue'
import AdminCampaignDetailView from '@/views/admin/AdminCampaignDetailView.vue'
import AdminCreateCampaignView from '@/views/admin/AdminCreateCampaignView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      // component: HomeView,
      children: [
        {
          path: '',
          name: 'home-route',
          meta: {
            layout: 'user',
            title: 'Trang chủ',
          },
          component: HomeView,
        },
        {
          path: 'campaigns',
          name: 'campaigns-route',
          meta: {
            layout: 'user',
            title: 'Các chiến dịch',
          },
          component: CampaignsView,
        },
        {
          path: 'about',
          name: 'about-route',
          meta: {
            layout: 'user',
            title: 'Về chúng tôi',
          },
          component: AboutView,
        },
        {
          path: 'login',
          name: 'login-route',
          meta: {
            layout: 'auth',
          },
          component: LoginView,
        },
        {
          path: 'register',
          name: 'register-route',
          meta: {
            layout: 'auth',
          },
          component: RegisterView,
        },
        {
          path: 'forgot-password',
          name: 'forgot-password-route',
          meta: {
            layout: 'auth',
          },
          component: ForgotPasswordView,
        },
        {
          path: 'reset-password',
          name: 'reset-password-route',
          meta: {
            layout: 'auth',
          },
          component: ResetPasswordView,
        },
      ],
    },

    {
      path: '/admin',
      children: [
        {
          path: '',
          name: 'admin-home-route',
          component: AdminHomeView,
          meta: {
            order: 1,
            layout: 'admin',
            title: 'Trang chủ',
            icon: 'home',
          },
        },
        {
          path: 'users',
          name: 'admin-users-route',
          component: AdminUserListView,
          meta: {
            order: 2,
            layout: 'admin',
            title: 'Quản lý người dùng',
            icon: 'users',
          },
        },
        {
          path: 'users/:id',
          name: 'admin-user-detail-route',
          component: AdminUserDetailView,
          meta: {
            layout: 'admin',
            parent: 'admin-users-route',
          },
        },
        {
          path: 'users/create',
          name: 'admin-create-user-route',
          component: AdminCreateUserView,
          meta: {
            layout: 'admin',
            parent: 'admin-users-route',
          },
        },
        {
          path: 'roles',
          name: 'admin-roles-route',
          component: AdminRolesListView,
          meta: {
            order: 3,
            layout: 'admin',
            title: 'Quản lý Roles',
            icon: 'role',
          },
        },
        {
          path: 'roles/:id',
          name: 'admin-role-detail-route',
          component: AdminRoleDetailView,
          meta: {
            layout: 'admin',
            parent: 'admin-roles-route',
          },
        },
        {
          path: 'roles/create',
          name: 'admin-create-role-route',
          component: AdminCreateRoleView,
          meta: {
            layout: 'admin',
            parent: 'admin-roles-route',
          },
        },

        {
          path: 'campaigns',
          name: 'admin-campaigns-route',
          component: AdminCampaignsListView,
          meta: {
            order: 4,
            layout: 'admin',
            title: 'Quản lý chiến dịch',
            icon: 'campaigns',
          },
        },

        {
          path: 'campaigns/:id',
          name: 'admin-campaign-detail-route',
          component: AdminCampaignDetailView,
          meta: {
            layout: 'admin',
            parent: 'admin-campaigns-route',
          },
        },
        {
          path: 'campaigns/create',
          name: 'admin-create-campaign-route',
          component: AdminCreateCampaignView,
          meta: {
            layout: 'admin',
            parent: 'admin-campaigns-route',
          },
        },
        {
          path: 'donations',
          name: 'admin-donations-route',
          component: AdminDonationsView,
          meta: {
            order: 5,
            layout: 'admin',
            title: 'Quản lý quyên góp',
            icon: 'donations',
          },
        },
      ],
    },
  ],
})

export default router
