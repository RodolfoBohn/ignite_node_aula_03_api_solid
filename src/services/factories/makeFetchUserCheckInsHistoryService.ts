
import { PrismaCheckInsRepository } from '@/repositories/prisma/prismaCheckInsRepository'
import { FetchUserCheckInsHistoryService } from '../fetchUserCheckInHistoryService'


export function makeFetchUserCheckInsHistoryService() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new FetchUserCheckInsHistoryService(checkInsRepository)

  return useCase
}