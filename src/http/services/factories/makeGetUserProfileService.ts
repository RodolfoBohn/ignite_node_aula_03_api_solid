import { GetUserProfileService } from '../getUserProfile'
import { PrismaUserRepository } from '@/http/repositories/prisma/prisma-users-repository'


export function makeGetUserProfileService() {
  const userRepository = new PrismaUserRepository()
  const useCase = new GetUserProfileService(userRepository)

  return useCase
}