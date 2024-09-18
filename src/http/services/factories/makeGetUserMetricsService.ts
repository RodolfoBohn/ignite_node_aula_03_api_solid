
import { PrismaCheckInsRepository } from '@/http/repositories/prisma/prismaCheckInsRepository'
import { GetUserMetricsService } from '../getUserMetricsService'


export function makeGetUserMetricsService() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new GetUserMetricsService(checkInsRepository)

  return useCase
}