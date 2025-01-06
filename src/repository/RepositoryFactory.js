import AuthenticationRepository from './AuthenticationRepository'
import CampaignCategoryRepository from './CampaignCategoryRepository'
import CampaignImageRepository from './CampaignImageRepository'
import CampaignRepository from './CampaignRepository'
import CommentRepository from './CommentRepository'
import DonationsRepository from './DonationsRepository'
import ImageRepository from './ImageRepository'
import LocalStorageRepository from './LocalStorageRepository'
import NotificationRepository from './NotificationRepository'
import NotificationTemplateRepository from './NotificationTemplateRepository'
import PaymentRepository from './PaymentRepository'
import ResultImageRepository from './ResultImageRepository'
import RoleRepository from './RoleRepository'
import UserRepository from './UserRepository'

const repositories = {
  authentication: AuthenticationRepository,
  localStorage: LocalStorageRepository,
  // errorCode: ErrorCodeRepository,
  users: UserRepository,
  roles: RoleRepository,
  campaigns: CampaignRepository,
  images: ImageRepository,
  categories: CampaignCategoryRepository,
  donations: DonationsRepository,
  payments: PaymentRepository,
  comments: CommentRepository,
  campaignImages: CampaignImageRepository,
  resultImages: ResultImageRepository,
  notificationTemplates: NotificationTemplateRepository,
  notifications: NotificationRepository,
}

export const RepositoryFactory = {
  get: (name) => repositories[name],
}
