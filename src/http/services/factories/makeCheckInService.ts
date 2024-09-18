
import { PrismaCheckInsRepository } from '@/http/repositories/prisma/prismaCheckInsRepository'
import { PrismaGymsRepository } from '@/http/repositories/prisma/prismaGymsRepository'
import { CheckInService } from '../checkInService'


export function makeCheckInService() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()

  const useCase = new CheckInService(checkInsRepository, gymsRepository)

  return useCase
}