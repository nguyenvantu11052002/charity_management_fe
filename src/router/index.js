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
import AdminCategoriesListView from '@/views/admin/AdminCategoriesListView.vue'
import AdminCategoryDetailView from '@/views/admin/AdminCategoryDetailView.vue'
import AdminCreateCategoryView from '@/views/admin/AdminCreateCategoryView.vue'
import CampaignDetailView from '@/views/user/CampaignDetailView.vue'
import PaymentReturnView from '@/views/user/PaymentReturnView.vue'
import UserDetailView from '@/views/user/UserDetailView.vue'
import CollaborationView from '@/views/user/CollaborationView.vue'
import UserCreateCampaignView from '@/views/user/UserCreateCampaignView.vue'
import AdminTemplatesListView from '@/views/admin/AdminTemplatesListView.vue'
import AdminNotificationView from '@/views/admin/AdminNotificationView.vue'
import AdminCreateTemplateView from '@/views/admin/AdminCreateTemplateView.vue'
import AdminTemplateDetailView from '@/views/admin/AdminTemplateDetailView.vue'
import CampaignSearchView from '@/views/user/CampaignSearchView.vue'
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
            order: 1,
            layout: 'user',
            title: 'Trang chủ',
          },
          component: HomeView,
        },
        {
          path: 'campaigns',
          name: 'campaigns-route',
          meta: {
            order: 2,
            layout: 'user',
            title: 'Các chiến dịch',
          },
          component: CampaignsView,
        },

        {
          path: 'campaigns/:id',
          name: 'campaign-detail-route',
          component: CampaignDetailView,
          meta: {
            layout: 'user',
            parent: 'campaigns-route',
          },
        },
        {
          path: 'campaigns/search/:keyword',
          name: 'campaign-search-route',
          component: CampaignSearchView,
          meta: {
            layout: 'user',
            parent: 'campaigns-route',
          },
        },
        {
          path: 'about',
          name: 'about-route',
          meta: {
            order: 3,
            layout: 'user',
            title: 'Về chúng tôi',
          },
          component: AboutView,
        },
        {
          path: 'collaboration',
          name: 'collaboration-route',
          meta: {
            order: 4,
            layout: 'user',
            title: 'Hợp tác',
          },
          component: CollaborationView,
        },
        {
          path: 'user-create-campaign',
          name: 'user-create-campaign-route',
          meta: {
            layout: 'user',
          },
          component: UserCreateCampaignView,
        },
        {
          path: 'user-detail',
          name: 'user-detail-route',
          meta: {
            // order: 3,
            layout: 'user',
            // title: 'Về chúng tôi',
          },
          component: UserDetailView,
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
        {
          path: 'payment-return',
          name: 'payment-return-route',
          meta: {
            layout: 'auth',
          },
          component: PaymentReturnView,
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
          path: 'categories',
          name: 'admin-categories-route',
          component: AdminCategoriesListView,
          meta: {
            order: 4,
            layout: 'admin',
            title: 'Quản lý danh mục',
            icon: 'categories',
          },
        },
        {
          path: 'categories/:id',
          name: 'admin-category-detail-route',
          component: AdminCategoryDetailView,
          meta: {
            layout: 'admin',
            parent: 'admin-categories-route',
          },
        },
        {
          path: 'categories/create',
          name: 'admin-create-category-route',
          component: AdminCreateCategoryView,
          meta: {
            layout: 'admin',
            parent: 'admin-categories-route',
          },
        },

        {
          path: 'campaigns',
          name: 'admin-campaigns-route',
          component: AdminCampaignsListView,
          meta: {
            order: 5,
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
            order: 6,
            layout: 'admin',
            title: 'Quản lý quyên góp',
            icon: 'donations',
          },
        },
        {
          path: 'templates',
          name: 'admin-templates-route',
          component: AdminTemplatesListView,
          meta: {
            order: 7,
            layout: 'admin',
            title: 'Quản lý mẫu thông báo',
            icon: 'notificationTemplates',
          },
        },
        {
          path: 'templates/:id',
          name: 'admin-template-detail-route',
          component: AdminTemplateDetailView,
          meta: {
            layout: 'admin',
            parent: 'admin-templates-route',
          },
        },
        {
          path: 'templates/create',
          name: 'admin-create-templates-route',
          component: AdminCreateTemplateView,
          meta: {
            layout: 'admin',
            parent: 'admin-templates-route',
          },
        },
        {
          path: 'notifications',
          name: 'admin-notifications-route',
          component: AdminDonationsView,
          meta: {
            order: 8,
            layout: 'admin',
            title: 'Quản lý thông báo',
            icon: 'notifications',
          },
        },
      ],
    },
  ],
})

export default router
