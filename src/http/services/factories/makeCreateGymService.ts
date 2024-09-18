
import { PrismaGymsRepository } from '@/http/repositories/prisma/prismaGymsRepository'
import { CreateGymService } from '../createGymService'


export function makeCreateGymService() {
  const gymsRepository = new PrismaGymsRepository()

  const useCase = new CreateGymService(gymsRepository)

  return useCase
}