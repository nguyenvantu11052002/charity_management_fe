import AuthenticationRepository from './AuthenticationRepository'
import CampaignCategoryRepository from './CampaignCategoryRepository'
import CampaignImageRepository from './CampaignImageRepository'
import CampaignRepository from './CampaignRepository'
import CommentRepository from './CommentRepository'
import DonationsRepository from './DonationsRepository'
import ImageRepository from './ImageRepository'
// import ErrorCodeRepository from './ErrorCodeRepository'
import LocalStorageRepository from './LocalStorageRepository'
import PaymentRepository from './PaymentRepository'
import RoleRepository from './RoleRepository'
// import NotificationRepository from './NotificationRepository'
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
  // notifications: NotificationRepository,
}

export const RepositoryFactory = {
  get: (name) => repositories[name],
}
