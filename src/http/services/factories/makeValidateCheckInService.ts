
import { PrismaCheckInsRepository } from '@/http/repositories/prisma/prismaCheckInsRepository'
import { ValidateCheckInService } from '../validateCheckInService'


export function makeValidateCheckInService() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new ValidateCheckInService(checkInsRepository)

  return useCase
}