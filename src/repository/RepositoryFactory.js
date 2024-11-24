import AuthenticationRepository from './AuthenticationRepository'
import CampaignCategoryRepository from './CampaignCategoryRepository'
import CampaignRepository from './CampaignRepository'
import ImageRepository from './ImageRepository'
// import ErrorCodeRepository from './ErrorCodeRepository'
import LocalStorageRepository from './LocalStorageRepository'
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
  // notifications: NotificationRepository,
}

export const RepositoryFactory = {
  get: (name) => repositories[name],
}
